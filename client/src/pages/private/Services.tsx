import Header from '../../components/header/PrivateHeader';
import SignServiceTable from '../../components/signServiceTable/SignServiceTable';
import Footer from '../../components/footer/Footer'
import usePageTitle from '../../hooks/UsePageTitle';

function Services() {

  return (
    <>
    {usePageTitle("Serviços | Genious")}
      <Header />
      <main className=''>
      <SignServiceTable/>
      </main>
      <Footer />
    </>
  )
}

export default Services;