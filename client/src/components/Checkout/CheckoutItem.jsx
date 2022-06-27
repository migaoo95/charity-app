
import blueT from '../../assets/jpeg/blueT.jpeg';
import classes from '../../styles/modules/Checkout/CheckoutItem.module.scss'
function CheckoutItem({data}) {
  return (
    <div className={classes.container}>
        <img src={data.imageUrls[0]} alt="" />
        <h1>{data.name}</h1>
        <h1> {data.price}$</h1>
    </div>
  )
}

export default CheckoutItem