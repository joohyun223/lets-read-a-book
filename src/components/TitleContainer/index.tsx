import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
	topContainer: {
		color: 'white',
		background: 'url(/img/recommended_book_background.png)',
		padding: '20px 20px',
		// minWidth: '840px',
	},
}));

export default function TitleContainer(props: any) {
	const classes = useStyles();
	return (
		<div className={classes.topContainer}>
			<Typography variant="h5" align="left">
				{props.title}
			</Typography>
			{props.children}
		</div>
	);
}
