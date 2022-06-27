import success from '../../assets/png/success.png'
import classes from '../../styles/modules/Checkout/Success.module.scss'
function Success() {
  return (
    <div className={classes.mainContainer}>
      <div className={classes.mainContainer__heading}>
      <h1>Congratulation</h1>
        <img src={success} alt="" />
      </div>
    </div>
  )
}

export default Success