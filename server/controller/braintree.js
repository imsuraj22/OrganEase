var braintree = require("braintree");
require("dotenv").config();

var gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: 'sm893w642hf8zrbn',
  publicKey: '6rdyw7rcgf4s3qk6',
  privateKey: 'dd15ab59aa133d13bd1d8a48ea0ac8ad',
});
// console.log('Public Key:', process.env.BRAINTREE_PUBLIC_KEY); // Should log: 6rdyw7rcgf4s3qk6
// console.log('Merchant ID:', process.env.BRAINTREE_MERCHANT_ID); // Should log yourMerchantId
// console.log('Private Key:', process.env.BRAINTREE_PRIVATE_KEY);

class brainTree {
  ganerateToken(req, res) {
    gateway.clientToken.generate({}, (err, response) => {
      if (err) {
        return res.json(err);
      }
      return res.json(response);
    });
  }

  paymentProcess(req, res) {
    let { amountTotal, paymentMethod } = req.body;
    gateway.transaction.sale(
      {
        amount: amountTotal,
        paymentMethodNonce: paymentMethod,
        options: {
          submitForSettlement: true,
        },
      },
      (err, result) => {
        if (err) {
          console.error(err);
          return res.json(err);
        }

        if (result.success) {
          console.log("Transaction ID: " + result.transaction.id);
          return res.json(result);
        } else {
          console.error(result.message);
        }
      }
    );
  }
}

const brainTreeController = new brainTree();
module.exports = brainTreeController;
