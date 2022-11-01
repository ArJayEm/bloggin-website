/* eslint-disable */
import React, { useState, useEffect, useRef } from "react";
import * as Icon from "react-bootstrap-icons";
import { usersCollection } from "../../firebase";
import { isBrowser, isMobile } from "react-device-detect";
//import PasswordStrengthBar from "react-password-strength-bar";
import { loadImage } from "../../index";

export default function Navigation({ isDashboard, isLoggedIn }) {
  const [isLogin, setIsLogin] = useState(() => false);
  const [isSignUp, setIsSignUp] = useState(() => false);
  isDashboard = isDashboard || false;

  const acceptButtonRef = useRef();

  const [email, setEmail] = useState(() => "");

  const [password, setPassword] = useState(() => "");
  const [passMinLen, setPassMinLen] = useState(() => false);
  const [passLower, setPassLower] = useState(() => false);
  const [passUpper, setPassUpper] = useState(() => false);
  const [passNums, setPassNums] = useState(() => false);
  const [passSpecial, setPassSpecial] = useState(() => false);

  const [confirmPassword, setConfirmPassword] = useState(() => "");

  const [emailError, setEmailError] = useState(() => "");
  const [passwordError, setPasswordError] = useState(() => "");
  const [confirmPasswordError, setConfirmPasswordError] = useState(() => "");

  const [isEmailValid, setIsEmailValid] = useState(() => false);
  const [isPasswordValid, setIsPasswordValid] = useState(() => false);
  const [isConfirmPasswordValid, setIsConfirmPasswordValid] = useState(
    () => true
  );
  const [isFormValid, setIsFormValid] = useState(() => false);
  const [user, setUser] = useState(() => null);
  const [splittedUsername, setSplittedUsername] = useState(() => "");
  //const [hasScrollBar, setHasScrollBar] = useState(() => false);
  const [isShownMenu, setIsShownMenu] = useState(() => false);

  useEffect(
    () => {
      document
        .querySelector(".container")
        .addEventListener("scroll", function () {
          loadImage();
        });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  // function loadImage() {
  //   var imgs = Array.from(document.querySelectorAll(".figure-image")); //img
  //   var thumbnails = Array.from(document.querySelectorAll(".thumbnail"));
  //   imgs = imgs.concat(thumbnails);
  //   imgs.forEach((img) => {
  //     var position = img.getBoundingClientRect();
  //     if (position.top >= 0 && position.bottom <= window.innerHeight) {
  //       var src = img.getAttribute("data-src");

  //       if (src) {
  //         //console.log(img);
  //         //img.setAttribute("src", src);
  //         img.style.backgroundImage = "url('" + src + "')";
  //         img.style.backgroundSize = "cover";
  //         img.setAttribute("data-src", "");
  //       }
  //     }
  //   });
  // }

  // function checkIfHasScrollBar() {
  //   var clientHeight = document.querySelector(".container").clientHeight;
  //   var scrollHeight = document.querySelector(".container").scrollHeight;
  //   //console.log(clientHeight, scrollHeight);
  //   //setHasScrollBar(clientHeight < scrollHeight);
  //   let hasScrollBar = clientHeight < scrollHeight;
  //   console.log(hasScrollBar);
  //   if (hasScrollBar === false) {
  //     loadImage();
  //   }
  // }

  useEffect(
    () => {
      //checkIfHasScrollBar();
      setIsShownMenu(!isMobile);
      if (isMobile) {
        document.getElementById("root").classList.add("mobile");
      }
      if (isDashboard) {
        document.getElementById("root").classList.add("dashboard-nav");
      }
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);

      getUser();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useEffect(
    () => {
      validateForm();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      email,
      password,
      confirmPassword,
      isEmailValid,
      isPasswordValid,
      isConfirmPasswordValid,
    ]
  );

  async function getUser() {
    await usersCollection
      .doc("rBsUB6ot5nSd2ZVZwVCHMIHRLn92")
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          setUser(() => snapshot.data());
          var username = snapshot.data().username;
          splitUsername(username);
        }
      })
      .catch((e) => {
        console.error(e);
      });
  }

  function splitUsername(username) {
    if (/([^0-9A-Za-z])/g.test(username)) {
      var newSplitted = [];
      var splitted = username.split(/([^A-Za-z0-9])/g);
      for (var i = 0; i < splitted.length; i++) {
        var s = splitted[i];

        if (/([^A-Za-z0-9])/g.test(s)) {
          newSplitted.push(s + splitted[i + 1]);
          i++;
        } else {
          newSplitted.push(s);
        }
      }
      setSplittedUsername(newSplitted);
    } else if (/([0-9])/g.test(username)) {
      setSplittedUsername(username.splitNumber());
    } else {
      setSplittedUsername(username);
    }
    document.title =
      (splittedUsername && splittedUsername.join("")) || username || "username";
    //console.log(splittedUsername);
  }

  function onNavClick(e) {
    if (
      isDashboard === false &&
      e.currentTarget.getAttribute("href") === "/dashboard"
    ) {
      e.preventDefault();
      window.location = "/";
    } else {
      var navLinks = document.querySelectorAll("nav li a");
      navLinks.forEach((link) => {
        link.classList.remove("active");
      });
      e.currentTarget.classList.add("active");

      if (isMobile) {
        setIsShownMenu(false);
      }
    }
  }

  function onLogInClick(e) {
    e.preventDefault();
    setIsLogin(true);
    setIsSignUp(false);
    reset();
    blur();
  }

  function onSignUpClick(e) {
    e.preventDefault();
    setIsSignUp(true);
    setIsLogin(false);
    reset();
    blur();
  }

  function blur() {
    var root = document.getElementById("root");
    if (!isLogin || !isSignUp) root.classList.add("in-modal");
    else root.classList.remove("in-modal");
  }

  function reset() {
    setEmailError(() => "");
    setPasswordError(() => "");
    setConfirmPasswordError(() => "");

    setIsEmailValid(() => false);
    setIsPasswordValid(() => false);
    setIsConfirmPasswordValid(() => false);

    setPassMinLen(() => false);
    setPassLower(() => false);
    setPassUpper(() => false);
    setPassNums(() => false);
    setPassSpecial(() => false);

    setIsFormValid(() => false);
  }

  function onCancelSignIn() {
    setIsLogin(() => false);
    setIsSignUp(() => false);
    var root = document.getElementById("root");
    root.classList.remove("in-modal");
  }

  async function onEmailKeyUp(e) {
    setEmail(e.currentTarget.value);
    var isValid = validateEmail();
    setIsEmailValid(isValid);
    //displayInputError(e, isValid);
    //validateForm();
  }
  function validateEmail() {
    var isValid = false;

    if (!!email.length) {
      isValid = email.testEmail();

      if (isValid === false) setEmailError(() => "Invalid email.");
    } else {
      setEmailError(() => "Email required.");
    }

    if (isValid) setEmailError(() => "");
    return isValid;
  }

  async function onPasswordKeyUp(e) {
    setPassword(e.currentTarget.value);
    var isValid = validatePassword();
    setIsPasswordValid(isValid);
    //displayInputError(e, isValid);
    //validateForm();
  }
  function validatePassword() {
    var isValid = false;

    if (!!password.length) {
      setPassMinLen(password.containsMinimumLength());
      setPassLower(password.containsLowercase());
      setPassUpper(password.containsUppercase());
      setPassNums(password.containsNumbers());
      setPassSpecial(password.containsSpecial());

      if (isSignUp) {
        isValid =
          password &&
          passMinLen &&
          passLower &&
          passUpper &&
          passNums &&
          passSpecial;
      } else {
        isValid = password && passMinLen;
      }

      // if (!!confirmPassword.length && password === confirmPassword)
      //   setConfirmPasswordError(() => "Passwords do not match.");
      if (isValid === false) setPasswordError(() => "Weak.");
    } else {
      setPasswordError(() => "Password required.");
    }

    if (isValid) setPasswordError(() => "");
    return isValid;
  }

  async function onConfirmPasswordKeyUp(e) {
    setConfirmPassword(e.currentTarget.value);
    var isValid = validateConfirmPassword();
    setIsConfirmPasswordValid(isValid);
    //displayInputError(e, isValid);
    //validateForm();
  }
  function validateConfirmPassword() {
    var isValid = false;

    if (!!confirmPassword.length) {
      isValid = password === confirmPassword;

      //if (isValid === false) setConfirmPasswordError(() => "Passwords do not match.");
    } else {
      setConfirmPasswordError(() => "Confirm password required.");
    }

    if (isValid) setConfirmPasswordError(() => "");
    return isValid;
  }

  function validateForm() {
    var isValid = isEmailValid && isPasswordValid;
    isValid = isSignUp
      ? isConfirmPasswordValid && password === confirmPassword
      : isValid;
    setIsFormValid(isValid);

    if (isFormValid) {
      //acceptButtonRef.current.focus();
    }
  }

  function onFormSubmit() {
    if (isLogin) {
      console.info("Log In");
    } else {
      console.info("Sign In");
    }
  }

  function emailComponent() {
    return (
      <div className="form-group grid-12">
        <input
          type="email"
          //ref={emailRef}
          className="form-control"
          placeholder="Email"
          onInput={(e) => onEmailKeyUp(e)}
        />
        {emailError && !isEmailValid && (
          <small className="text-danger">{emailError}</small>
        )}
      </div>
    );
  }
  function passwordComponent() {
    return (
      <div className="form-group grid-12">
        <input
          type="password"
          //ref={passwordRef}
          className="form-control"
          placeholder="Password"
          onKeyUp={(e) => onPasswordKeyUp(e)}
        />
        {!email && passwordError && !isPasswordValid && (
          <small className="text-danger">{passwordError}</small>
        )}
      </div>
    );
  }
  function confirmPasswordComponent() {
    return (
      <div className="form-group grid-12">
        <input
          type="password"
          //ref={confirmPasswordRef}
          className="form-control"
          placeholder="Confirm Password"
          onKeyUp={(e) => onConfirmPasswordKeyUp(e)}
        />
        {confirmPasswordError && !isConfirmPasswordValid && (
          <small className="text-danger">{confirmPasswordError}</small>
        )}
      </div>
    );
  }

  function passwordCheckListComponent() {
    return (
      <ul id="PasswordChecklist">
        <li>
          <small>at least 8 characters</small>{" "}
          <Icon.X size={20} color={password && passMinLen ? "green" : "red"} />
        </li>
        <li>
          <small>lowercase letters</small>{" "}
          <Icon.X size={20} color={password && passLower ? "green" : "red"} />
        </li>
        <li>
          <small>uppercase letters</small>{" "}
          <Icon.X size={20} color={password && passUpper ? "green" : "red"} />
        </li>
        <li>
          <small>numbers</small>{" "}
          <Icon.X size={20} color={password && passNums ? "green" : "red"} />
        </li>
        <li>
          <small>special characters</small>{" "}
          <Icon.X size={20} color={password && passSpecial ? "green" : "red"} />
        </li>
        {isSignUp && (
          <li>
            <small>passwords match</small>{" "}
            <Icon.X
              size={20}
              color={
                isConfirmPasswordValid && password === confirmPassword
                  ? "green"
                  : "red"
              }
            />
          </li>
        )}
      </ul>
    );
  }

  function LogInComponent() {
    return (
      <div id="Login">
        <div className="card">
          <div className="card-title">
            <h2>Log In</h2>
            <Icon.X
              size={35}
              className="close"
              title="Close"
              onClick={() => onCancelSignIn()}
            />
          </div>
          <form onSubmit={onFormSubmit}>
            {emailComponent()}
            {passwordComponent()}
            <div className="form-group grid-12">
              <button
                className="btn btn-primary form-control wide"
                type="submit"
                disabled={!isFormValid}
              >
                Log In
              </button>
            </div>
          </form>
          <span>
            No account?{" "}
            <a
              href="/signup"
              onClick={(e) => onSignUpClick(e)}
              ref={acceptButtonRef}
            >
              <strong>Sign In</strong>
            </a>
          </span>
          <div className="separator">
            <hr />
            OR
            <hr />
          </div>
          <form className="social-sign-in" style={{ color: "white" }}>
            <div className="form-group grid-12">
              <button
                className="btn form-control wide"
                style={{ background: "orange" }}
              >
                <Icon.Google size={15} /> Sign in with Google
              </button>
            </div>
            <div className="form-group grid-12">
              <button
                className="btn form-control wide"
                style={{ background: "#5381de" }}
              >
                <Icon.Facebook size={15} color="white" /> Sign in with Facebook
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  function SignUpComponent() {
    return (
      <div id="SignUp">
        <div className="card">
          <div className="card-title">
            <h2>Sign In</h2>
            <Icon.X
              size={35}
              className="close"
              title="Close"
              onClick={() => onCancelSignIn()}
            />
          </div>
          <form onSubmit={onFormSubmit}>
            {emailComponent()}
            {passwordComponent()}
            {confirmPasswordComponent()}
            {passwordCheckListComponent()}
            <div className="form-group grid-12">
              <button
                className="btn btn-primary form-control wide"
                type="submit"
                disabled={!isFormValid}
              >
                Sign In
              </button>
            </div>
          </form>
          <span>
            Already have an account?{" "}
            <a
              href="/login"
              onClick={(e) => onLogInClick(e)}
              ref={acceptButtonRef}
            >
              <strong>Log In</strong>
            </a>
          </span>
        </div>
      </div>
    );
  }

  var navigationLinks = [
    { title: "Dashboard", link: "dashboard", icon: <Icon.House size={25} /> },
    {
      title: "About Me",
      link: "aboutme",
      icon: <Icon.FilePerson size={25} />,
    },
    { title: "Events", link: "events", icon: <Icon.Collection size={25} /> },
    // {title: "Gallery", link: "gallery", icon: <Icon.Collection size={25} /> },
    { title: "Albums", link: "albums", icon: <Icon.Collection size={25} /> },
    { title: "Shop", link: "shop", icon: <Icon.Bag size={25} /> },
    {
      title: "Socials",
      link: "socials",
      icon: <Icon.Facebook size={25} />,
    },
  ];

  function onMenuClick(e) {
    e.preventDefault();
    //var menu = document.querySelector(".navigation ul");
    //document.querySelector("#dashboard h1").innerHTML = "waadsd";
    //menu.style.display = menu.offsetLeft === 0 ? "block" : "none";
    setIsShownMenu(!isShownMenu);
    //console.log(isShownMenu);
  }

  return (
    <>
      <div className={"navigation"}>
        <div className="blocker"></div>
        <nav>
          {isMobile && (
            <div className="menu-button">
              <a href="#" onClick={(e) => onMenuClick(e)}>
                <Icon.List size={25} color="gold" />
              </a>
            </div>
          )}
          <a href="/" className="logo">
            {/* <img src={logo} alt="logo" />             */}
            {splittedUsername ? (
              splittedUsername.map((e, i) => {
                // var parser = new DOMParser();
                // var elem = parser.parseFromString(e, "text/xml");
                return i % 2 === 1 ? (
                  <h1 className="theme-text-color" key={i}>
                    {e}
                  </h1>
                ) : (
                  <h2 key={i}>{e}</h2>
                );
              })
            ) : (
              <h2>username</h2>
            )}
          </a>
          <ul
            style={{
              display: isShownMenu
                ? isMobile
                  ? "block"
                  : "flex"
                : isMobile
                ? "none"
                : "block",
            }}
          >
            {isMobile && (
              <li
                style={{ textAlign: "right", borderBottom: "1px solid #eee" }}
              >
                <Icon.X size={45} onClick={(e) => setIsShownMenu(false)} />
              </li>
            )}
            {navigationLinks.map((e, i) => {
              var link = e.link; //e.title.toLocaleLowerCase().replace(/[ ]/g, "")
              //if (!isDashboard && (e.link === "aboutme" || e.link === "socials")) return;

              return (
                <li key={i}>
                  <a
                    href={(isDashboard ? "#" : "/") + link} //(link ? "#" : "/")
                    className={i === 0 ? "active" : ""}
                    onClick={(e) => onNavClick(e)}
                  >
                    {isMobile && <>{e.icon}&nbsp;</>}
                    {e.title}
                    {/* {e.child && <Icon.ChevronDown />} */}
                  </a>
                </li>
              );
            })}
            {isMobile && (
              <li className="logout">
                <a>
                  <Icon.BoxArrowLeft size={25} />
                  &nbsp;Log Out
                </a>
              </li>
            )}
          </ul>

          {/* <div className="sign-in">
            {isLoggedIn ? (
              <button
                className="btn btn-secondary darken"
                onClick={(e) => onLogInClick(e)}
              >
                Log Out
              </button>
            ) : (
              <button
                className="btn btn-primary darken"
                onClick={(e) => onLogInClick(e)}
              >
                Log In
              </button>
            )}
            {/* <button
              className="btn btn-primary darken"
              onClick={(e) => onSignUpClick(e)}
            >
              Sign In
            </button> 
          </div> */}
        </nav>
        {isLogin && LogInComponent()}
        {isSignUp && SignUpComponent()}
      </div>
    </>
  );
}
