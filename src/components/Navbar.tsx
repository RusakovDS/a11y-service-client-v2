import { useState } from "react";
import { Link } from "react-router-dom";
import { useLogOutMutation } from "../app/services/api/authApi";
import { logout } from "../app/slices/authSlice";
import { useAppDispatch, useAppSelector } from "../app/store";
import Modal from "./Modal";
import SignInModal from "./SignInModal";
import SignUpForm from "./SignUpForm";

const initialState = {
  signInModalActive: false,
  signUpModalActive: false,
};

const Navbar = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const [modals, setModals] = useState(initialState);

  const [logoutFromAPI] = useLogOutMutation();

  const handleToggleSignInModal = () => {
    setModals((prev) => {
      return { ...prev, signInModalActive: !prev.signInModalActive };
    });
  };

  const handleToggleSignUpModal = () => {
    setModals((prev) => {
      return { ...prev, signUpModalActive: !prev.signUpModalActive };
    });
  };

  const handleLogoutButton = async () => {
    await logoutFromAPI();
    dispatch(logout());
  };

  return (
    <>
      <div className="flex h-16 items-center justify-between bg-red-300 px-8">
        <Link to="/">A11Y Checker</Link>
        <div className="space-x-4">
          {user ? (
            <>
              <Link to="/projects">Projects</Link>
              <span>{user?.email}</span>
              <button onClick={handleLogoutButton}>Logout</button>
            </>
          ) : (
            <>
              <button onClick={handleToggleSignInModal}>Sign in</button>
              <button onClick={handleToggleSignUpModal}>Sign up</button>
            </>
          )}
        </div>
      </div>
      {!user && (
        <>
          <SignInModal
            active={modals.signInModalActive}
            closeModal={handleToggleSignInModal}
          />
          <Modal
            active={modals.signUpModalActive}
            closeModal={handleToggleSignUpModal}
          >
            <SignUpForm />
          </Modal>
        </>
      )}
    </>
  );
};

export default Navbar;
