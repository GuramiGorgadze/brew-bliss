import React, { useEffect } from 'react'
import { useUserData } from '../context/UserContext.jsx'
import { InstagramPromo } from '../components'
import { useForm } from 'react-hook-form'
import { updateAddress } from '../api/api'
import { Link } from 'react-router-dom'
import { useLoader } from '../context/LoaderContext';

function Address() {
    const { userData, login } = useUserData()
    const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm()

    const { useFakeLoader } = useLoader();
    useEffect(() => useFakeLoader(), []);

    useEffect(() => {
        if (userData?.address) {
            reset(userData.address)
        }
    }, [userData])

    const onSubmit = async (formData) => {
        try {
            const data = await updateAddress(formData)
            login(data.data)
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className='address'>
            <div className='address__header'>
                <h2 className='address__title'>ADDRESS</h2>
                <div className='address__divider'></div>
            </div>

            <div className="address__body">
                <h2 className="address__body-title"><Link to="/account"><i class="bi bi-chevron-left"></i></Link>Edit Address</h2>

                <form id="address-form" className="address__form" onSubmit={handleSubmit(onSubmit)}>
                    <div className="address__form-column">
                        <div className="address__field">
                            <label className="address__field-label" htmlFor="firstName">First Name</label>
                            <input className="address__field-input" type="text" maxLength={20} id="firstName" {...register('firstName')} />
                        </div>
                        <div className="address__field">
                            <label className="address__field-label" htmlFor="lastName">Last Name</label>
                            <input className="address__field-input" type="text" maxLength={20} id="lastName" {...register('lastName')} />
                        </div>
                        <div className="address__field">
                            <label className="address__field-label" htmlFor="address">Address N1</label>
                            <input className="address__field-input" type="text" maxLength={50} id="address" {...register('address')} />
                        </div>
                        <div className="address__field">
                            <label className="address__field-label" htmlFor="address2">Address N2</label>
                            <input className="address__field-input" type="text" maxLength={50} id="address2" {...register('address2')} />
                        </div>
                    </div>

                    <div className="address__form-column">
                        <div className="address__field">
                            <label className="address__field-label" htmlFor="country">Country</label>
                            <input className="address__field-input" type="text" maxLength={40} id="country" {...register('country')} />
                        </div>
                        <div className="address__field">
                            <label className="address__field-label" htmlFor="city">City</label>
                            <input className="address__field-input" type="text" maxLength={40} id="city" {...register('city')} />
                        </div>
                        <div className="address__field">
                            <label className="address__field-label" htmlFor="zip">Postal/ZIP Code</label>
                            <input className="address__field-input" type="text" maxLength={10} id="zip" {...register('zip')} />
                        </div>
                        <div className="address__field">
                            <label className="address__field-label" htmlFor="phone">Phone</label>
                            <input className="address__field-input" type="text" maxLength={20} id="phone" {...register('phone')} />
                        </div>
                    </div>
                </form>

                <div className="address__buttons">
                    <button className="address__btn address__btn--save" type="submit" form="address-form" disabled={isSubmitting}>
                        <i className="bi bi-pencil"></i> {isSubmitting ? 'Saving...' : 'Edit Address'}
                    </button>
                    <button className="address__btn address__btn--reset" type="button" onClick={() => reset(userData.address)}>
                        <i className="bi bi-trash3"></i> Reset Address
                    </button>
                </div>
            </div>

            <InstagramPromo />
        </div>
    )
}

export default Address