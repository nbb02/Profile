import { initializeApp } from "firebase/app"
import { getAnalytics, isSupported } from "firebase/analytics"
import { getFirestore } from "firebase/firestore"
import config from "../../firebase.json"

export const app = initializeApp(config)
export const db = getFirestore(app)

export const analyticsPromise =
  typeof window === "undefined"
    ? Promise.resolve(null)
    : isSupported()
        .then((supported) => (supported ? getAnalytics(app) : null))
        .catch(() => null)
