import Loan from '../models/Loan';
import Repayment from '../models/Repayment';

class RepaymentController {
  static postLoanRepayment(req, res) {
    const { loanID } = parseInt(req.params.loanID, 10);
    const { paidAmount } = parseFloat(req.body, 10);
    const loanRecord = Loan.find(loanID);

    if (!loanRecord) {
      return res.status(404).json({ status: 404, error: 'loan record not found' });
    }
    if (loanRecord.status === 'pending') {
      return res.status(422).json({
        status: 422,
        error: 'loan request is not even approved!',
      });
    }
    if (paidAmount > loanRecord.paymentInstallment) {
      return res.status(409).json({
        status: 409,
        error: `You are supposed to pay ${loanRecord.paymentInstallment} monthly`,
      });
    }
    if (loanRecord.status === 'approved') {
      if (loanRecord.repaid === true) {
        res.status(409).json({ status: 409, error: 'loan already fully repaid' });
      } else {
        const newBalance = loanRecord.balance - paidAmount;
        if (newBalance === 0) {
          loanRecord.repaid = true;
          loanRecord.update(newBalance);
          loanRecord.update(loanRecord.repaid);
        }
      }
    }
    const data = { loanID, paidAmount };
    const repayRecord = Repayment.create(data);
    return res.status(201).json({
      status: 201,
      data: {
        id: repayRecord.id,
        loanId: repayRecord.loanID,
        amount: loanRecord.amount,
        monthlyInstallment: loanRecord.paymentInstallment,
        paidAmount,
        balance: loanRecord.balance,
      },
    });
  }

  static getRepaymentHistory(req, res) {
    const { loanId } = req.params;

    const loanRecord = Repayment.find(loanId);
    if (!loanRecord) {
      return res.status(404).json({
        status: 404,
        error: 'record not found',
      });
    }

    return res.status(200).json({
      status: 200,
      data: loanRecord,
    });
  }
}

export default RepaymentController;
