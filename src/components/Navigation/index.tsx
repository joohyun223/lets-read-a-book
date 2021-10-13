import { useState } from 'react';
import { observer } from 'mobx-react';
import user from '../../store/userInfo';
import { AppBar, Toolbar, IconButton, Typography, Avatar, MenuItem, Menu } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import {
	makeStyles,
	unstable_createMuiStrictModeTheme,
	ThemeProvider,
} from '@material-ui/core/styles';
import { useGoogleLogout } from 'react-google-login';
import TemporaryDrawer from '../Drawer';

const theme = unstable_createMuiStrictModeTheme();

const useStyles = makeStyles(() => ({
	root: {
		flexGrow: 1,
	},

	avatar: {
		marginRight: '6px',
		backgroundColor: 'green',
	},
	menuBox: {
		display: 'flex',
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},

	title: {
		textAlign: 'left',
		flexGrow: 1,
	},
}));

const Navigation = (): JSX.Element => {
	const classes = useStyles();
	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);
	const { signOut } = useGoogleLogout({
		clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID + '',
		onLogoutSuccess: () => {
			sessionStorage.removeItem('login_session');
			user.logout();
		},
	});

	const handleMenu = (event: any) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const goHome = () => {
		window.location.replace(window.location.origin);
	};

	return (
		<div className={classes.root}>
			<AppBar position="static">
				<Toolbar>
					<TemporaryDrawer />
					<Typography className={classes.title} variant="h6" onClick={goHome}>
						책을 읽읍시다
					</Typography>
					<ThemeProvider theme={theme}>
						<IconButton aria-haspopup="true" onClick={handleMenu} color="inherit">
							<Avatar className={classes.avatar} src={user.imageUrl} />
							<p style={{ fontSize: '16px' }}>{user.name} 님</p>
						</IconButton>
						<Menu
							id="menu-appbar"
							anchorEl={anchorEl}
							keepMounted
							open={open}
							onClose={handleClose}
							getContentAnchorEl={null}
							anchorOrigin={{
								vertical: 'bottom',
								horizontal: 'center',
							}}
							transformOrigin={{
								vertical: 'top',
								horizontal: 'center',
							}}
						>
							<MenuItem onClick={signOut}>로그아웃</MenuItem>
						</Menu>
					</ThemeProvider>
				</Toolbar>
			</AppBar>
		</div>
	);
};

export default observer(Navigation);
