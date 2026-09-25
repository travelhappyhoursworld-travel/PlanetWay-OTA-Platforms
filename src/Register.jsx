import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const nav = useNavigate()

  const register = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password)
      alert("Uspešna registracija")
      nav("/")
    } catch (e) {
      alert(e.message)
    }
  }

  return (
    <div style={{textAlign:"center",marginTop:100}}>
      <h2>Register</h2>
      <input placeholder="Email" onChange={e=>setEmail(e.target.value)} /><br/><br/>
      <input type="password" placeholder="Password" onChange={e=>setPassword(e.target.value)} /><br/><br/>
      <button onClick={register}>Register</button>
    </div>
  )
}