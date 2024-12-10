import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import SettingsIcon from "@mui/icons-material/Settings";
import { useTheme } from '@mui/material/styles';

const Navbar = () => {
  const theme = useTheme();
  return (
    <div style={{left: "204px" , position :"sticky"}}>
      <AppBar
        position="static"
        // className="bg-white"
        style={{
          backgroundColor: "#FFFFFF",
          height: "70px",
          boxShadow: "none",
        }}
      >
        <Toolbar
          // className="flex justify-between"
          style={{
            height: "100%",
            display:"flex",
            justifyContent:"space-between"
          }}
        >
          <Typography variant="h6" style={{marginLeft:"7px", color:"black",fontWeight:"600px"}}>
            67 Kumar Enclave, Thane
          </Typography>
          <div style={{height:"40px", width:"530px", top:"15px" ,display:"flex",justifyContent:"center",gap:"24px"}}>
            <div
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: '#FAFBFC',
                borderRadius: '9999px',
                border: theme.borderstyle.border,
                color: theme.background.primarycolor,
              }}
            >
              <Typography
                component="span"
                style={{
                  fontFamily: "Roboto",
                  fontSize: "14px",
                  fontWeight: 300,
                  lineHeight: "16px",
                }}
              >
                Dedicated desks available:{" "}
              </Typography>
              <span
                style={{
                  fontFamily: "Roboto",
                  fontSize: "14px",
                  fontWeight: 700,
                  lineHeight: "16px",
                }}
              >
                2,100
              </span>
            </div>

            <div
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: '#FAFBFC',
                borderRadius: '9999px',
                border: theme.borderstyle.border,
                color: theme.background.primarycolor,
              }}
            >
              <Typography
                component="span"
                style={{
                  fontFamily: "Roboto",
                  fontSize: "14px",
                  fontWeight: 300,
                  lineHeight: "16px",
                }}
              >
                Today's bill amount:{" "}
              </Typography>
              <span
                // className="text-[#000000]"
                style={{
                  fontFamily: "Roboto",
                  fontSize: "14px",
                  fontWeight: 700,
                  lineHeight: "16px",
                  color:"#000000"
                }}
              >
                Rs 00.0
              </span>
            </div>
            <IconButton
              edge="end"
              // className="text-[#111111]"
              aria-label="settings"
              style={{
                width:"40px",
                height:"40px",
                color:"#111111",
                // border: "1px solid #BDBDBD",
                border: theme.borderstyle.border,
              }}
            >
              <SettingsIcon   style={{
                width:"14.96px",
                height:"14.96px",
                top:"0.68px",
                left:"0.68px"
              }}/>
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>

{/* hr line */}
      <div
        style={{
          width: "100%",
          height: "1px",
          backgroundColor: "#DDDDDD",
        }}
      ></div>
    </div>
  );
};

export default Navbar;