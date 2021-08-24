import { AppBar, Toolbar, Typography } from "@material-ui/core";
import "./header.scss";

export default function Header() {
  const rent4EventLogo = (
    <Typography variant="h6" component="h1">
      Rent4Event
    </Typography>
  );

  const displayDesktop = () => {
    return <Toolbar>{rent4EventLogo}</Toolbar>;
  };

  return (
    <header>
      <AppBar className="app-header">{displayDesktop()}</AppBar>
    </header>
  );
}
