import Loan from "../models/Loan";
import Repayment from "../models/Repayment";

class RepaymentController {
  static postLoanRepayment(req, res) {
    /*
     *   There wouldn't be a loanID in req.params.
     *   There will be req.params.id though.
     */
    const loanID = parseInt(req.params.id, 10);
    const { paidAmount } = req.body;
    const loanRecord = Loan.find(loanID);

    if (!loanRecord) {
      return res
        .status(404)
        .json({ status: 404, error: "loan record not found" });
    }
    // This will care for the two other options
    if (loanRecord.status !== "approved") {
      return res.status(422).json({
        status: 422,
        error: "loan request is not even approved!"
      });
    }
    if (paidAmount > loanRecord.paymentInstallment) {
      return res.status(409).json({
        status: 409,
        error: `You are supposed to pay ${
          loanRecord.paymentInstallment
        } monthly`
      });
    }
    // Because of line 19, if (loanRecord.status === "approved") becomes redundant
    if (loanRecord.repaid === true) {
      return res
        .status(409)
        .json({ status: 409, error: "loan already fully repaid" });
    }

    const newBalance = loanRecord.balance - paidAmount;

    if (newBalance === 0) {
      loanRecord.update({ repaid: true });
    } else {
      // This might be a good usecase for Object.assign()
      loanRecord.update({ balance: newBalance });
    }

    const data = { loanID, paidAmount };
    const repayRecord = Repayment.create(data);
    return res.status(201).json({
      status: 201,
      data: {
        id: repayRecord.id,
        amount: loanRecord.amount,
        loanId: repayRecord.loanID,
        balance: loanRecord.balance,
        paidAmount: loanRecord.paidAmount,
        monthlyInstallment: loanRecord.paymentInstallment
      }
    });
  }

  static getRepaymentHistory(req, res) {
    const { loanId } = req.params;

    const loanRecord = Repayment.find(loanId);
    if (!loanRecord) {
      return res.status(404).json({
        status: 404,
        error: "record not found"
      });
    }

    return res.status(200).json({
      status: 200,
      data: loanRecord
    });
  }
}

export default RepaymentController;
