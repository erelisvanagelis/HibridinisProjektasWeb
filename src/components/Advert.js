import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import {
  Card,
  CardActions,
  CardContent,
  Divider,
  Link,
  Typography,
} from "@mui/material";

export default function Advert({ advert, buttonLabel, handleAction, setAdvert }) {
  return (
    <Card>
      <CardContent>
        <Divider />
        <Link href={advert.url}>{advert.url}</Link>

        <Typography variant="body1">
          TechnicianId: {advert.technicianId}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => {
            setAdvert(advert)
            handleAction()
        }
        }>
          {buttonLabel}
        </Button>
      </CardActions>
    </Card>
  );
}
