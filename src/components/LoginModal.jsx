import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { Formik, Form, Field } from "formik";
import { loginRequest } from "../actions/actionCreators/authAC";
import { X as CloseButtonIcon } from "react-feather";
import ReactDOM from "react-dom";
import useDetectOutsideClick from "../hooks/useDetectOutsideClick";
import useOnPress from "../hooks/useOnPress";
import { useContext, useRef } from "react";
import LoginModalContext from "../contexts/LoginModalContext";
import { useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import useScrollBlocked from "../hooks/useScrollBlocked";

const validationSchema = Yup.object().shape({
  login: Yup.string().email().required(),
  password: Yup.string().required(),
});

const initialValues = {
  login: "",
  password: "",
  rememberMe: false,
};

const FormBody = () => {
  const dispatch = useDispatch();

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      validateOnMount
      onSubmit={(values) => dispatch(loginRequest(values))}
    >
      {({ isValid, dirty }) => (
        <Form className="login-wrapper__form">
          <Field
            name="login"
            type="email"
            placeholder="Адрес электронной почты"
          />
          <Field name="password" type="password" placeholder="Пароль" />
          <div className="login-wrapper__remember-me-wrapp">
            <Field name="rememberMe" type="checkbox" />
            <span className="login-wrapper__remember-me-label">
              Запомнить меня
            </span>
          </div>
          <button
            className="login-wrapper__login-btn button button_theme-second button_size-large button_text-bold"
            type="submit"
            disabled={!(isValid && dirty)}
          >
            Войти
          </button>
        </Form>
      )}
    </Formik>
  );
};

const LoginModal = (props) => {
  const { loginVisible, setLoginVisible } = useContext(LoginModalContext);

  const isMobile = useMediaQuery({ maxWidth: 768 });

  const { setIsScrollBlocked } = useScrollBlocked({ isMobile });

  useEffect(() => {
    props.auth && setLoginVisible(false);
  }, [props.auth]);

  useEffect(() => {
    if (loginVisible) {
      setIsScrollBlocked(true);
    } else if (!loginVisible) {
      setIsScrollBlocked(false);
    }

    return () => {
      setIsScrollBlocked(false);
    };
  }, [loginVisible]);

  const ref = useRef();

  useOnPress(setLoginVisible);
  useDetectOutsideClick(ref, setLoginVisible);

  return ReactDOM.createPortal(
    <div
      className={
        loginVisible ? "login-wrapper" : "login-wrapper login-wrapper_hidden"
      }
    >
      <div className="login-wrapper__login-body" ref={ref}>
        <div className="login-wrapper__login-body-close-btn">
          <CloseButtonIcon onClick={() => setLoginVisible(false)} />
        </div>
        <div className="">
          <h2 className="login-wrapper__login-body-title">Вход в аккаунт</h2>
          <FormBody />
        </div>
      </div>
    </div>,
    document.body
  );
};

export default LoginModal;
