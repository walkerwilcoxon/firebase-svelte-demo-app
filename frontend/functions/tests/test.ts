import firebaseFunctionsTest from 'firebase-functions-test'
const { wrap } = firebaseFunctionsTest({
  projectId: 'quote-connects-website',
})
import { getFirestore } from 'firebase-admin/firestore'
import { submitApplication } from '../src'

const firestore = getFirestore()

test('submitApplication function adds document to collection and sends email', async () => {
  const application = {
    type: 'agent',
    userData: {
      email: 'test@example.com',
      name: 'Test User',
      surveyProfiles: {
        'standard-v1': {
          rankings: {
            'customer-service': 5,
            'coverage-options': 4,
            price: 3,
            'claims-process': 2,
            'financial-stability': 1,
          },
        },
      },
    },
  }
  const context = {
    auth: {
      uid: 'testUid',
    },
  }

  // Call the submitApplication function with the test application object and context
  await wrap(submitApplication)(application, context)

  // Check that a document was added to the 'applications' collection with the correct data
  const docRef = firestore.collection('applications').doc()
  const doc = await docRef.get()
  expect(doc.data()).toEqual({
    ...application,
    applicationId: docRef.id,
  })

  // Check that an email was sent with the correct data
  const emailRef = firestore.collection('emails').doc()
  const email = await emailRef.get()
  expect(email.data()).toEqual({
    to: 'quoteconnects@gmail.com',
    template: {
      name: 'application',
      data: {
        name: 'Test User',
        acceptLink: expect.stringContaining(docRef.id),
        denyLink: expect.stringContaining(docRef.id),
      },
    },
  })
})
