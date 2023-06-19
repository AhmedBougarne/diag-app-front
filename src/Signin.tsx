import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { FormControl, FormLabel, Radio, RadioGroup } from "@mui/material";
import axios from "axios";
import { APP_BASE_URL } from "./constants";
import { useNavigate } from "react-router-dom";

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();
enum Role {
  admin = "admin",
  agent = "agent",
}
export default function SignIn() {
  const navigate = useNavigate();
  const [role, setRole] = React.useState<Role>(Role.agent);
  const [user, setUser] = React.useState({
    username: "",
    password: "",
    crmId: "",
  });
  const handleSubmit = async () => {
    const response = await axios.post(
      `${APP_BASE_URL}/auth/signin`,
      {
        ...user,
        role,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    localStorage.setItem("jwt", response.data.jwt);
    if (response.data && response.data.authenticated) {
      if (role === Role.agent) {
        navigate("/home");
      } else navigate("/admin");
    }
  };
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container
        component="main"
        maxWidth="xs"
        style={{ fontFamily: "Tajawal" }}
      >
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <FormLabel id="demo-radio-buttons-group-label">Role</FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue={role}
              name="radio-buttons-group"
              onChange={(event, value) => {
                setRole(Role[value as Role]);
                setUser({
                  username: "",
                  password: "",
                  crmId: "",
                });
              }}
            >
              <FormControlLabel
                value={Role.admin}
                control={<Radio />}
                label={"Admin"}
              />
              <FormControlLabel
                value={Role.agent}
                control={<Radio />}
                label={"Agent"}
              />
            </RadioGroup>
          </Box>

          {role === Role.admin ? (
            <>
              <TextField
                margin="normal"
                fullWidth
                value={user.username}
                id="username"
                label="Username"
                name="username"
                onChange={(event) => {
                  setUser({ ...user, username: event.target.value });
                }}
              />
              <TextField
                margin="normal"
                fullWidth
                value={user.password}
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(event) => {
                  setUser({ ...user, password: event.target.value });
                }}
              />
            </>
          ) : (
            <>
              <TextField
                margin="normal"
                fullWidth
                id="crmId"
                value={user.crmId}
                label="CRM ID"
                name="text"
                onChange={(event) => {
                  setUser({ ...user, crmId: event.target.value });
                }}
              />
            </>
          )}
          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={() => {
              handleSubmit();
            }}
          >
            Sign In
          </Button>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
