import { Grid } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';

export function BookBoxSeleton(): JSX.Element {
	return (
		<Grid container direction="row" spacing={3}>
			<Grid item xs={1}>
				<Skeleton variant="circle" width={20} height={20} />
			</Grid>

			<Grid item xs={2} className="Thumb">
				<Skeleton variant="rect" width={82} height={105} />
			</Grid>

			<Grid item xs={7} className="bookDataWrap" style={{ textAlign: 'left' }}>
				<Skeleton variant="text" />
				<Skeleton variant="text" />
				<Skeleton variant="text" />
				<Skeleton variant="text" />
			</Grid>

			<Grid item xs={2}>
				<Skeleton variant="rect" width={73} height={100} />
			</Grid>
		</Grid>
	);
}
