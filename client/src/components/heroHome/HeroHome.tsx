import photo from '../../assets/imgs/herohome.jpg';
import logoWhite from "./../../assets/imgs/logo.png";


function HeroHome() {

  return (
    <>
        <div className="w-full bg-center bg-cover lg:h-[35rem] h-[20rem] shadow-lg bg-" style={{backgroundImage:
            `url(${photo})`,}}>
        <div className="flex items-center justify-center w-full h-full bg-gray-900/40">
            <div className="text-center">
            <img className="lg:w-[24rem] w-[10rem] h-auto  ml-[5rem]" src={logoWhite} alt="Logo da Genious World" />
                <h1 className="text-3xl font-semibold text-white lg:text-4xl sm:text-base w-[20rem] lg:w-[34rem]">
O design que sua empresa merece! </h1>
            </div>
        </div>
    </div>
    </>
  )
}

export default HeroHome;