import CarruselOfertas from "../Productos/CarruselOfertas"
import CintaPromociones from "./CintaPromociones"
import GrillaProductos from "./GrillaProductos"
import HeaderSlider from "./HeaderSlider"
import SeccionInformativa from "./SeccionInfomativa"

const Inicio = () => {
  return (
    <div>
      <HeaderSlider />
      <CintaPromociones />
      <SeccionInformativa />
      <CarruselOfertas />
      <GrillaProductos />
    </div>
  )
}

export default Inicio
