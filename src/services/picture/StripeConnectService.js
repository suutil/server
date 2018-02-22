class StripeConnectService {
  constructor(stripeSecretKey)  {
    this.stripe = require('stripe')(stripeSecretKey)
  }

  listEvents() {
    return this.stripe.events.list()
      .then(result => {
        console.log(result)
        return result
      })
  }

  createAccount({
    email
  }) {
    return this.stripe.accounts.create({
        email,
        country: 'ES',
        type: 'custom'
      })
      .catch(error => {
        console.error(error)
        throw error
      })
  }

  getConnectAccount(accountId) {
    return this.stripe.accounts.retrieve(accountId)
  }

  uploadFile({
    purpose,
    stripe_account,
    imageData
  }) {

    var regex = /^data:.+\/(.+);base64,$/;
    let comma = imageData.slice(0, 50).indexOf(',')
    let header = imageData.slice(0, comma + 1)

    var matches = header.match(regex);

    var ext = matches[1];
    var data = imageData.slice(comma + 1)

    var buffer = new Buffer(data, 'base64');
    let name = 'identity_document.' + ext

    return this.stripe.fileUploads.create({
      purpose,
      file: {
        data: buffer,
        name,
        type: 'application/octet-stream'
      }
    }, {
      stripe_account
    })
  }


  updateConnectAccount({
    stripeAccountId,
    userId,
    documentId,
    city,
    line1,
    postal_code,
    external_account,
    business_name,
    business_tax_id,
    day,
    month,
    year,
    first_name,
    last_name,
    type,
    ip
  }) {

    return this.getConnectAccount(stripeAccountId)
      .then(stripeAccount => {
        //console.log(stripeAccount.external_account)
        //stripeAccount.external_accounts.data[0].last4 === external_account.substring(4)

        var data = {
          legal_entity: {
            address: {
              city,
              line1,
              postal_code
            },
            dob: {
              day,
              month,
              year
            },
            first_name,
            last_name,
            type,
            verification: {
              document: documentId
            }
          },
          tos_acceptance: {
            date: Math.floor(Date.now() / 1000),
            ip
          }
        }

        if (type === 'company') {
          data.legal_entity.additional_owners = ''
          data.legal_entity.personal_address = {
            city,
            line1,
            postal_code
          }
          data.legal_entity.business_name = business_name
          data.legal_entity.business_tax_id = business_tax_id
        }

        if (external_account) {
          data.external_account = {
            object: 'bank_account',
            account_number: external_account,
            country: 'ES',
            currency: 'EUR'
          }
        }

        return this.stripe.accounts.update(
          stripeAccountId, data
        );
      })

  }
}



module.exports = StripeConnectService;
