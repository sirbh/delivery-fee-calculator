import { Container } from '@mui/material';
import FeeForm from '../fee-calculator-form';
import withLayout from '../../hoc/withLayout';

function FormContainer() {
    return (
        <Container
            maxWidth={false}
            sx={{
                minHeight: '100vh',
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
                backgroundImage: `url("/food.jpg")`,
                backgroundSize: 'cover',
                backgroundPositionX: '10rem',
            }}
        >
            <FeeForm />
        </Container>
    );
}

export default withLayout(FormContainer);
