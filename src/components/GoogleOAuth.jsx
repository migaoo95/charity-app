import { useLocation, useNavigate } from "react-router-dom";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
// Update the database
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase-config";
import { toast } from "react-toastify";
import googleBtn from "../assets/png/googleBtn.png";
function GoogleOAuth() {
  const navigate = useNavigate();
  const location = useLocation();
  const onGoogleClick = async () => {
    try {
      const auth = getAuth();
      // create a provider
      const provider = new GoogleAuthProvider();
      // Set result
      const result = await signInWithPopup(auth, provider);
      // getting a user from the google sign in
      const user = result.user;
      // Check for user
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);
      // If user doesnot exist create user
      if (!docSnap.exists()) {
        // Set doc have two parameter // first is the entry in our database // second data that we want to add
        await setDoc(doc(db, "users", user.uid), {
          name: user.displayName,
          email: user.email,
          timeStamp: serverTimestamp(),
        });
      }
      navigate("/home");
    } catch (error) {
      toast.error("Cound not authorize with google");
    }
  };
  return (
    <button className="px-8" onClick={onGoogleClick}>
      <img className="h-1/2" src={googleBtn} alt="" />
    </button>
  );
}

export default GoogleOAuth;
