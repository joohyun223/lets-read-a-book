import { ButtonWrap, Button } from './styled';

type props = {
	buttonText: string;
	handleClickButton: () => void;
};
const ButtonBox = ({ buttonText, handleClickButton }: props) => {
	return (
		<ButtonWrap>
			<Button onClick={() => handleClickButton()}>{buttonText}</Button>
		</ButtonWrap>
	);
};

export default ButtonBox;
