import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { MDBDataTable } from "mdbreact";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Button from '@material-ui/core/Button'
import Loader from "../../components/Loader/Loader";
import Tooltip from "@material-ui/core/Tooltip";
import SideDrawer from "../Drawer/SideDrawer";
import SuccessBar from "../SnackBar/SuccessBar";
import ErrorBar from "../SnackBar/ErrorBar";
import { adminGetAllUsers, editCertainUser } from "../../actions/userActions";
import AdminUserDialog from "./AdminUserDialog";

const useStyles = makeStyles((theme) => ({
  root: {},
  create: {
    height: 32,
  },
  icon: {
    marginLeft: 5,
    "& .MuiSvgIcon-root": {
      widthL: 15,
      height: 15,
      color: "#4285f4",
    },
  },
  tableContainer: {
    paddingTop: 25,
  },
}));

function AdminUser() {
  document.title = "Users";
  const classes = useStyles();
  const { id } = useParams();
  const dispatch = useDispatch();
  const allUsers = useSelector((state) => state.allUsers);
  const { loading, allUsersData = [] } = allUsers;

  const [open, setOpen] = useState(false);
  const [editUser, setEditUser] = useState("");
  const [message, setMessage] = useState("");
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openFailure, setOpenFailure] = useState(false);
  // const [toAddUser,setToAddUser] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  const editUserHandler = (user) => {
    setEditUser(user);
    setOpen(true);
  };

  const handleCloseBar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSuccess(false);
    setOpenFailure(false);
  };

  useEffect(() => {
    dispatch(adminGetAllUsers());
  }, []);

  const submitHandler = async (e, tier, role, id) => {
    e.preventDefault();
    setOpen(false); //closing modal
    const formData = new FormData();
    formData.set("tier", tier);
    formData.set("role", role);
    const { success } = await dispatch(editCertainUser(id, formData));
    if (success) {
      setMessage("Changes Saved Successfully");
      setOpenSuccess(true);
    } else {
      setMessage("Error in saving changes");
      setOpenFailure(true);
    }
  };

  const mdbJobs = () => {
    const data = {
      columns: [
        {
          label: "UserID",
          field: "userid",
          sort: "asc",
        },
        {
          label: "Name",
          field: "name",
          sort: "asc",
        },
        {
          label: "Email",
          field: "email",
          sort: "asc",
        },
        {
          label: "Role",
          field: "role",
          sort: "asc",
        },
        {
          label: "Tier",
          field: "tier",
          sort: "asc",
        },
        {
          label: "Actions",
          field: "actions",
        },
      ],
      rows: [],
    };

    allUsersData.forEach((user) => {
      data.rows.push({
        userid: user._id,
        name: <span>{user.name}</span>,
        email: `${user.email}`,
        role: `${user.role === "user" ? "student" : user.role}`,
        tier:
          user.tier === "paid" ? (
            <p style={{ color: "blue" }}>Paid</p>
          ) : (
            <p style={{ color: "green" }}>Free</p>
          ),
        actions: (
          <>
            <Tooltip title="Edit" placement="top" arrow>
              <button
                className="btn btn-primary py-1 px-2  ml-2"
                onClick={() => editUserHandler(user)}
              >
                <i class="far fa-edit"></i>
              </button>
            </Tooltip>
          </>
        ),
      });
    });

    return data;
  };

  // const handleClickOpen = () => {
  //   setToAddUser(true);
  //   setEditUser(false);
  // }


  if (loading) return <Loader />;

  return (
    <>
      <SuccessBar
        handleClose={handleCloseBar}
        openSuccess={openSuccess}
        message={message}
      />
      <ErrorBar
        openFailure={openFailure}
        message={message}
        handleClose={handleCloseBar}
      />
      <Grid container className={classes.root}>
        <Grid item xs={12} md={2}>
          <SideDrawer />
        </Grid>
        <Grid className={classes.tableContainer} item xs={12} md={10}>
          <Grid container justify="center">
            <Grid item xs={12} md={10}>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
              >
                <h1>All Users</h1>
                {/* <Button
                  className={classes.create}
                  size='small'
                  variant='contained'
                  color='primary'
                  onClick={handleClickOpen}
                >
                  Create
                </Button> */}
              </Box>

              <MDBDataTable data={mdbJobs()} bordered striped hover />
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <AdminUserDialog
        open={open}
        handleClose={handleClose}
        user={editUser}
        submitHandler={submitHandler}
      />
    </>
  );
}

export default AdminUser;
