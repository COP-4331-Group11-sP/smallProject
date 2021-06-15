import '../styles/header.css';
import 'bootstrap/dist/css/bootstrap.css';
import {Image, Navbar} from 'react-bootstrap';
import pandaIconSVG from "../assets/normalPandaIconSVG.svg"

export default function PandaHeader(props)
{
  return(
    <div className="py-lg-5 pb-5">
      <Navbar className = {["pandaHeader title gap-3 justify-content-center shadow", props.className]}>
        <p className="d-inline d-lg-none">PANDA CONTACT</p><p className="d-none d-lg-inline">PANDA</p><Image className = "Image" src={pandaIconSVG} roundedCircle/><p className="d-none d-lg-inline">CONTACT</p>
      </Navbar>
    </div>
  );
    
}