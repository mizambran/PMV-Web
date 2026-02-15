import GrillaProductos from "./GrillaProductos"
import Footer from "../shared/Footer"
import HeaderSlider from "./HeaderSlider"
import SeccionInformativa from "./SeccionInfomativa"


const Inicio = () => {
  return (
    <div>
        <HeaderSlider />
        <SeccionInformativa />
        <GrillaProductos />
    </div>
  )
}

export default Inicio
