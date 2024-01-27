import { useState } from 'react';
import { CalendarMonth } from '@mui/icons-material';
import {
    Button,
    InputAdornment,
    Paper,
    TextField,
    Typography,
} from '@mui/material';
import {
    LocalizationProvider,
    MobileDateTimePicker,
} from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

import { Formik } from 'formik';
import * as Yup from 'yup';
import { FeeFormConstants } from '../../utils/appConstants';
import deliveryChargeCalculator from '../../utils/deliveryChargeCalculator';

function FeeCalculatorForm() {
    const [totalFee, setTotalFee] = useState<string>('0');
    return (
        <Formik
            validateOnBlur={false}
            validateOnChange={false}
            initialValues={{
                cartValue: 0,
                deliveryDistance: 0,
                amountOfItems: 0,
                time: new Date(),
            }}
            onSubmit={(values) => {
                const { amountOfItems, cartValue, deliveryDistance, time } =
                    values;
                const formattedCartValue = parseFloat(cartValue.toFixed(2));
                // const cartValueInCents = Math.round(formattedCartValue * 100);
                const fee = deliveryChargeCalculator(
                    formattedCartValue,
                    deliveryDistance,
                    amountOfItems,
                    time
                );

                if (fee) {
                    setTotalFee(`${(fee / 100).toFixed(2)} €`);
                } else if (fee === 0) {
                    setTotalFee('0 €');
                } else {
                    setTotalFee('cannot be processed');
                }
            }}
            validationSchema={Yup.object({
                cartValue: Yup.number()
                    .positive('cart value should be a postive number')
                    .required('cart value cannot be empty')
                    .test(
                        'is-decimal',
                        'please follow format 00.00 €',
                        (val) => {
                            if (val !== undefined) {
                                return /^-?[0-9]+(?:\.[0-9]{1,2})?$/.test(
                                    val.toString()
                                );
                            }
                            return true;
                        }
                    ),
                deliveryDistance: Yup.number()
                    .positive('delivery distance should be a postive number')
                    .max(7500, 'cannot be more than 7500 meters')
                    .required('delivery distance cannot be empty'),
                amountOfItems: Yup.number()
                    .positive('amount of items should be a postive number')
                    .required('amount of items cannot be empty'),
                time: Yup.date().required('Time is required'),
            })}
        >
            {(formik) => (
                <Paper
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        padding: '2rem',
                        width: { sm: '80%', md: '40%' },
                        justifyContent: 'space-around',
                    }}
                    elevation={3}
                >
                    <Typography
                        variant="h5"
                        sx={{ fontFamily: 'Pacifico', marginBottom: '2rem' }}
                    >
                        {FeeFormConstants.formHeading}
                    </Typography>
                    <TextField
                        label={FeeFormConstants.cartInputLabel}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="start">
                                    {FeeFormConstants.currencyUnit}
                                </InputAdornment>
                            ),
                        }}
                        type="number"
                        sx={{ margin: '0.5rem 0rem' }}
                        {...formik.getFieldProps('cartValue')}
                        error={!!formik.errors.cartValue}
                        helperText={formik.errors.cartValue}
                    />
                    <TextField
                        label={FeeFormConstants.distanceInputLabel}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="start">
                                    {FeeFormConstants.distanceUnit}
                                </InputAdornment>
                            ),
                        }}
                        type="number"
                        sx={{ margin: '0.5rem 0rem' }}
                        {...formik.getFieldProps('deliveryDistance')}
                        error={!!formik.errors.deliveryDistance}
                        helperText={formik.errors.deliveryDistance}
                    />
                    <TextField
                        label={FeeFormConstants.itemsInputLabel}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="start">
                                    {FeeFormConstants.itemsAdornment}
                                </InputAdornment>
                            ),
                        }}
                        type="number"
                        sx={{ margin: '0.5rem 0rem' }}
                        {...formik.getFieldProps('amountOfItems')}
                        error={!!formik.errors.amountOfItems}
                        helperText={formik.errors.amountOfItems}
                    />

                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <MobileDateTimePicker
                            onChange={(d) => {
                                if (d) {
                                    formik.setFieldValue('time', d);
                                }
                            }}
                            value={formik.values.time}
                            renderInput={(props) => (
                                <TextField
                                    {...props}
                                    sx={{ margin: '0.5rem 0rem' }}
                                    name="time"
                                    error={!!formik.errors.time}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="start">
                                                <CalendarMonth />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            )}
                            label="Order time"
                        />
                    </LocalizationProvider>
                    <Typography variant="h6" sx={{ margin: '0.5rem 0rem' }}>
                        Total Fee: {totalFee}
                    </Typography>
                    <Button
                        variant="contained"
                        onClick={() => {
                            formik.handleSubmit();
                        }}
                        sx={{ marginBottom: '1rem' }}
                    >
                        {FeeFormConstants.submitLabel}
                    </Button>
                    <Button
                        variant="outlined"
                        onClick={() => {
                            formik.resetForm();
                        }}
                    >
                        {FeeFormConstants.resetLabel}
                    </Button>
                </Paper>
            )}
        </Formik>
    );
}

export default FeeCalculatorForm;
