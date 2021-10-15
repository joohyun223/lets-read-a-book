import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import FavoriteIcon from '@material-ui/icons/Favorite';
import HomeIcon from '@material-ui/icons/Home';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
import { IconButton, List, ListItem, ListItemIcon, ListItemText, Drawer } from '@material-ui/core';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
	list: {
		width: 250,
	},
	fullList: {
		width: 'auto',
	},
	drawerPaper: {
		backgroundColor: '#353c49',
	},
	link: {
		color: 'white',
		textDecoration: 'none',
	},
	linkIcon: {
		color: 'white',
	},
});

export default function TemporaryDrawer() {
	const classes = useStyles();
	const [state, setState] = React.useState(false);

	const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
		if (
			event.type === 'keydown' &&
			((event as React.KeyboardEvent).key === 'Tab' ||
				(event as React.KeyboardEvent).key === 'Shift')
		) {
			return;
		}

		setState(open);
	};

	const list = () => (
		<div
			className={clsx(classes.list, {
				[classes.fullList]: false,
			})}
			role="presentation"
			onClick={toggleDrawer(false)}
			onKeyDown={toggleDrawer(false)}
		>
			<List>
				<Link to="/" className={classes.link}>
					<ListItem button key="home">
						<ListItemIcon className={classes.linkIcon}>{<HomeIcon />}</ListItemIcon>
						<ListItemText primary={'도서검색'} />
					</ListItem>
				</Link>

				<Link to="/bestbook" className={classes.link}>
					<ListItem button key="bestbook">
						<ListItemIcon className={classes.linkIcon}>{<FavoriteIcon />}</ListItemIcon>
						<ListItemText primary={'인기도서'} />
					</ListItem>
				</Link>

				{/* <Link to="/bestperson" className={classes.link}>
					<ListItem button key="bestperson">
						<ListItemIcon className={classes.linkIcon}>{<EmojiPeopleIcon />}</ListItemIcon>
						<ListItemText primary={'이달의 독서왕'} />
					</ListItem>
				</Link> */}
			</List>
		</div>
	);

	return (
		<React.Fragment key="left">
			<IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer(true)}>
				<MenuIcon />
			</IconButton>
			<Drawer
				classes={{ paper: classes.drawerPaper }}
				anchor="left"
				open={state}
				onClose={toggleDrawer(false)}
			>
				{list()}
			</Drawer>
		</React.Fragment>
	);
}
