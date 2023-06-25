import React, { useState } from "react";
import { TextField, Button, Container, Stack } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
// import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import IconButton from "@mui/material/IconButton";
import SendIcon from "@mui/icons-material/Send";
import styled from "styled-components";
import {
  createTheme,
  makeStyles,
  responsiveFontSizes,
  ThemeProvider,
} from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import {
  collection,
  addDoc,
  serverTimestamp,
  doc,
  setDoc,
} from "firebase/firestore";
import { db } from "./firebase";

let theme = createTheme();
theme = responsiveFontSizes(theme);

const useStyles = makeStyles((theme) => ({
  Heading: {
    color: "#fff",
    fontFamily: "Courier New",
    fontWeight: "700",
    textAlign: "center",
    paddingTop: "2%",
    marginTop: "5%",
    marginBottom: "2%",
    textShadow: "1px 2px 3px rgba(0, 0, 0, 0.9)",
    animation: `$myEffect 2000ms ${theme.transitions.easing.easeInOut}`,
    "@media (max-width:1100px)": {
      marginTop: "50px",
    },
  },
  "@keyframes myEffect": {
    "0%": {
      opacity: 0,
      transform: "translateY(-200%) ",
    },
    "50%": {
      opacity: 0.5,
    },
    "100%": {
      opacity: 1,
      transform: "translateY(0) ",
    },
  },
}));

export default function UserData() {
  const classes = useStyles();
  // const [firstName, setFirstName] = useState("");
  // const [lastName, setLastName] = useState("");
  // const [email, setEmail] = useState("");
  // const [dateOfBirth, setDateOfBirth] = useState("");
  const [submit, setSubmit] = useState(false);
  // const [gender, setGender] = useState("None");
  // const [age, setAge] = useState("");
  //   const { width, height } = useWindowSize();
  //   const [password, setPassword] = useState("");
  const [userDetails, setUserDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    dob: "",
    gender: "",
  });

  const handleChange = (event) => {
    setUserDetails({
      ...userDetails,
      [event.target.name]: event.target.value,
    });
  };

  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmit(true);
    // console.log(userDetails);
    try {
      const data = collection(db, "UserData");
      const docRef = await addDoc(data, {
        created: serverTimestamp(),
        userDetails: userDetails,
      });
      // console.log("Document written with ID: ", docRef);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };
  function nextPage(event) {
    event.preventDefault();
    navigate("/choice");
  }
  return (
    <Styles>
      <ThemeProvider theme={theme}>
        <Typography variant="h2" className={classes.Heading}>
          User Info
        </Typography>
      </ThemeProvider>
      {/* <div style={{ margin: "15rem" }}> */}
      {submit && <Confetti width={1600} height={1000} />}
      {/* <h2>Register Form</h2> */}
      <form onSubmit={handleSubmit} action={<Link to="/" />}>
        <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
          <TextField
            name="firstName"
            type="text"
            variant="outlined"
            color="secondary"
            label="First Name"
            onChange={handleChange}
            value={userDetails.firstName}
            fullWidth
            required
          />
          <TextField
            name="lastName"
            type="text"
            variant="outlined"
            color="secondary"
            label="Last Name"
            onChange={handleChange}
            value={userDetails.lastName}
            fullWidth
            required
          />
        </Stack>
        <TextField
          name="email"
          type="email"
          variant="outlined"
          color="secondary"
          label="Email"
          onChange={handleChange}
          value={userDetails.email}
          fullWidth
          required
          sx={{ mb: 4 }}
        />
        {/* <TextField
          type="password"
          variant="outlined"
          color="secondary"
          label="Password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          required
          fullWidth
          sx={{ mb: 4 }}
        /> */}
        <TextField
          type="date"
          variant="outlined"
          color="secondary"
          label="Date of Birth"
          onChange={handleChange}
          value={userDetails.dob}
          name="dob"
          fullWidth
          required
          sx={{ mb: 4 }}
          InputLabelProps={{ shrink: true }}
        />
        <FormControl sx={{ m: 1 }} fullWidth>
          <Select
            value={userDetails.gender}
            label="Gender"
            name="gender"
            onChange={handleChange}
          >
            <MenuItem value={"Male"}>Male</MenuItem>
            <MenuItem value={"Female"}>Female</MenuItem>
            <MenuItem value={"Other"}>Other</MenuItem>
          </Select>
        </FormControl>
        {/* <TextField
          type="number"
          variant="outlined"
          color="secondary"
          label="Age"
          onChange={(e) => setAge(e.target.value)}
          value={age}
          required
          sx={{ m: 1 }}
        /> */}

        <Button
          variant="contained"
          color="primary"
          type="submit"
          endIcon={<SendIcon />}
          size="large"
          style={{ margin: "5%" }}
        >
          Submit
        </Button>
      </form>

      <IconButton
        size="large"
        style={{ margin: "5rem" }}
        color="secondary"
        onClick={nextPage}
      >
        {submit && <ArrowForwardIosIcon fontSize="large" />}
      </IconButton>
      {/* <small>
        Already have an account? <Link to="/login">Login Here</Link>
      </small> */}
      {/* </div> */}
    </Styles>
  );
}

const Styles = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: url("../images/contact.jpeg") center no-repeat;
  background-size: cover;
  margin: 0px;
  padding: 0px;

  @media screen and (max-width: 980px) {
    height: auto;
  }

  .sub-title {
    color: white;
    text-align: center;
    font-size: 30px;
    margin-bottom: 40px;
  }

  #contact-container {
    width: 1200px;
    border-radius: 15px;
    overflow: hidden;
    padding: 15px;
    display: flex;
    -webkit-backdrop-filter: blur(100px);
    -moz-backdrop-filter: blur(100px);
    backdrop-filter: blur(100px);
    border: 2px solid rgba(255, 255, 255, 0.3);
    box-shadow: 0px 10px 33px 0px rgba(0, 0, 0, 0.75);

    @media screen and (max-width: 1080px) {
      flex-direction: column;
      width: 90%;
      height: auto;
      margin-bottom: 50px;
    }
  }

  #contact-container .contact-info {
    flex: 0 1 35%;
    background-image: linear-gradient(45deg, #93a5cf 0%, #e4efe9 100%);
    border-radius: 15px;
    padding: 40px;
    color: white;
    display: flex;
    flex-direction: column;
    @media screen and (max-width: 990px) {
      height: auto;
    }
  }

  .contact-info h4 {
    font-size: 35px;
    font-weight: 500;
    margin-top: 0;
    color: #000;
    @media screen and (max-width: 990px) {
      font-size: 25px;
      margin-top: -30px;
      text-align: center;
    }
  }

  .contact-info p {
    font-size: 20px;
    color: rgba(255, 255, 255, 0.7);
    font-weight: 300;
    margin-bottom: 32px;
    color: #0077;
    @media screen and (max-width: 990px) {
      font-size: 15px;
      text-align: center;
    }
  }

  .contact-info .icon-text {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    line-height: 50px;
    @media screen and (max-width: 990px) {
      line-height: 20px;
    }
  }

  .contact-info .icon-text .fa {
    font-size: 25px;
    margin-right: 32px;
    flex: 0 1 40px;
    cursor: pointer;
    @media screen and (max-width: 990px) {
      font-size: 15px;
      justify-content: center;
      margin-left: 30%;
    }
  }

  .contact-info .icon-text .fa-phone {
    color: #f26522;
  }

  .fa-envelope {
    color: #ed1811;
  }

  .fa-map-marker {
    color: #f3b604;
  }

  .contact-info .icon-text span {
    font-size: 13px;
    font-weight: 300;
    color: #000;
    @media screen and (max-width: 990px) {
      font-size: 10px;
      word-wrap: wrap;
    }
  }

  .contact-info .social-media {
    display: flex;
    width: 70%;
    height: 100%;
    justify-content: space-between;
    align-items: flex-end;
    @media screen and (max-width: 990px) {
      margin-top: 15px;
      width: 40%;
      align-self: center;
    }
  }

  .contact-info .social-media .icon-circle {
    flex: 0 1 20%;
    justify-content: center;
    align-items: center;
    display: flex;
    height: 40px;
    border-radius: 50%;
    transition: 0.2s all ease-in-out;
    &:hover {
      transform: scale(1.5);
    }
  }
`;
