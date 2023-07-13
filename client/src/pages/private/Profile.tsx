import Header from '../../components/header/PrivateHeader';
import ProfileCard from '../../components/profileCard/ProfileCard';
import Footer from '../../components/footer/Footer'
import usePageTitle from '../../hooks/UsePageTitle';

function Profile() {

  return (
    <>
    {usePageTitle("Perfil | Perfil")}
      <Header />
      <main className='mt-4 py-20'>
      <ProfileCard />
      </main>
      <Footer />
    </>
  )
}

export default Profile;