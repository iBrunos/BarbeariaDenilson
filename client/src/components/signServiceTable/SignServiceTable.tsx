import React, { useState, useEffect } from "react";
import Select from "react-select";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios, { AxiosRequestConfig } from "axios";
import Cookies from 'js-cookie';
import jwtDecode from "jwt-decode";

interface RedesSociais {
  value: string;
  label: string;
}

const options: RedesSociais[] = [
  { value: "Motion / Video", label: "Motion / Video" },
  { value: "Arte estática", label: "Arte estática" },
  { value: "Arte impressa", label: "Arte impressa" }
];

interface Company {
  _id: string;
  name: string;
  cnpj: string;
  cep: string;
  state: string;
  city: string;
  social_network: string;
  ownerId: string;
  ownerName: string;
}

const API_URL = "http://localhost:3000/company/signup";
const API_URL_GET = "http://localhost:3000/company";
const API_URL_GET_USER = "http://localhost:3000/auth";

const SignCompaniesTable: React.FC = () => {
  const [items, setItems] = useState<Company[]>([]);
  const [name, setname] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [cep, setCep] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [userId, setUserId] = useState("");
  const [email, setEmail] = useState<string>(""); // Alterado o tipo para string
  const [ownerName, setOwnerName] = useState<string>(""); // Alterado o tipo para string
  const [social_network, setSocial_network] = useState<RedesSociais[]>([]);
  const [profileImage, setProfileImage] = useState("");
  const [deleteItemId, setDeleteItemId] = useState("");



  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const token = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };


    try {
      const response = await axios.get(API_URL_GET, config);
      setItems(response.data);
    } catch (error) {
      console.error(error);
    }
  };



  useEffect(() => {
    const hasCC = localStorage.getItem('CC');
    const ccValue = hasCC === 'true';
    let token: any;
    if (ccValue) {
      token = Cookies.get('_Usr_tk_');
    } else {
      token = localStorage.getItem('_Usr_tk_');
    }
    const fetchUser = async () => {
      if (token) {
        const decodedToken: any = jwtDecode(token);
        const userId = decodedToken.id;
        setUserId(userId);

        if (userId) {
          const config: AxiosRequestConfig = {
            headers: { Authorization: `Bearer ${token}` },
          };
          // 
          try {
            const response = await axios.get(`${API_URL_GET_USER}/${userId}`, config);
      
            const { email, username } = response.data;
            const imageBuffer = response.data.profileImage.data; // obtém o buffer de imagem do response
            const blob = new Blob([new Uint8Array(imageBuffer)], {
              type: "image/*",
            }); // cria um objeto Blob a partir do buffer
            const imageUrl = URL.createObjectURL(blob); // cria um URL para o objeto Blob
            setProfileImage(imageUrl); // define a URL como a fonte da imagem
            setEmail(email);
            setOwnerName(username);
     
          } catch (error) {
            console.error(error);
          }
        }
      }
    };
    fetchUser();
  }, [userId]);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const socialNetworksString = social_network.map((network) => network.value).join(", ");

      const newItem: Company = {
        _id: "",
        name,
        cnpj,
        cep,
        state,
        city,
        social_network: socialNetworksString,
        ownerId: userId,
        ownerName: ownerName
      };

      const response = await axios.post(API_URL, newItem, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setItems([...items, response.data]);

      setname("");
      setCnpj("");
      setCep("");
      setState("");
      setCity("");
      setSocial_network([]);
      toast.success('Empresa criada com sucesso.');
      fetchItems();
    } catch (error) {
      console.error(error);
      toast.error('Ocorreu um erro ao criar a empresa.');
      fetchItems();
    }
  };

  const handleDeleteItem = async (itemId: string) => {
    setDeleteItemId(itemId); // Armazena o ID do item a ser excluído no estado
  
    try {
      const token = localStorage.getItem("token");
      const config: AxiosRequestConfig = {
        headers: { Authorization: `Bearer ${token}` },
      };
  
      await axios.delete(`${API_URL_GET}/${itemId}`, config); // Faz a requisição DELETE para excluir o item
  
      // Atualiza a lista de itens após a exclusão bem-sucedida
      setItems(items.filter((item) => item._id !== itemId));
  
      toast.success("Item excluído com sucesso.");
    } catch (error) {
      console.error(error);
      toast.error("Ocorreu um erro ao excluir o item.");
    }
  
    setDeleteItemId(""); // Limpa o ID do item excluído do estado
  };
  
  

  return (
    <>
      <ToastContainer />
      <section className="bg-white dark:bg-[#313131] pt-24 pb-[22%] pr-10 flex flex-col ">
        <section className="max-w-6xl pt-6 mx-auto bg-white rounded-md  dark:bg-[#313131]">
          <h2 className="text-lg font-semibold text-gray-700 capitalize dark:text-white">
            Pedidos de Artes
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-4 gap-6 mt-4 sm:grid-cols-7">
              <div>
                <label
                  className="text-gray-700 dark:text-gray-200"
                  htmlFor="username"
                >
                  Copy (Descrição)
                </label>
                <input
                  id="username"
                  type="text"
                  placeholder="Nome"
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-white dark:text-black dark:border-gray-100 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                  value={name}
                  onChange={(e) => setname(e.target.value)}
                  required
                />
              </div>

              <div className="w-[10.8rem]">
                <label
                  className="text-gray-700 dark:text-gray-200"
                  htmlFor="emailAddress"
                >
                  Resolução da art
                </label>
                <input
                  id="emailAddress"
                  type="number"
                  className="block w-full px-1 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-white dark:text-black dark:border-gray-100 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                  placeholder="00.000.0000/0001-00"
                  value={cnpj}
                  onChange={(e) => setCnpj(e.target.value)}
                  required
                />
              </div>
            
              <div className="ml-[2rem] w-[20rem] dark:bg-">
                <label className="text-gray-700 dark:text-gray-200" htmlFor="password">
                Formato
                </label>
                <Select
                  defaultValue={[]}
                  isMulti
                  options={options}
                  className="block w-full mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-white dark:text-black dark:border-gray-100 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                  classNamePrefix="select"
                  value={social_network}
                  onChange={(selectedOptions) => setSocial_network(selectedOptions as RedesSociais[])}
                  required
                />
              </div>
              <div className="ml-52 w-[8rem]">
                <label
                  className="text-gray-700 dark:text-gray-200"
                  htmlFor="passwordConfirmation"
                >
                  Data de entrega
                </label>
                <input
                  id="passwordConfirmation"
                  type="number"
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-white dark:text-black dark:border-gray-100 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                  placeholder="Cep"
                  value={cep}
                  onChange={(e) => setCep(e.target.value)}
                  required
                />
              </div>
              <div className="ml-48 w-[8rem]">
                <button type="submit" className="px-8 py-2.5 mt-8 leading-5 text-white transition-colors duration-300 transform bg-green-700 rounded-md hover:bg-green-600 focus:outline-none focus:bg-gray-600">
                  Salvar
                </button>
              </div>
            </div>
          </form>
        </section>
        <section className="container px-4 mx-auto">
          <div className="flex flex-col mt-6">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                <div className="overflow-hidden border border-gray-200 dark:border-[#2a2a2a] md:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-[#2a2a2a]">
                    <thead className="bg-gray-50 dark:bg-[#3a3a3a]">
                      <tr>
                        <th
                          scope="col"
                          className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                        >
                          <div className="flex items-center px-10">
                            <span>Nome</span>
                          </div>
                        </th>

                        <th
                          scope="col"
                          className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                        >
                          <button className="flex items-center gap-x-2">
                            <span>CNPJ</span>
                          </button>
                        </th>

                        <th
                          scope="col"
                          className="px-3 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                        >
                          <button className="flex items-center gap-x-2">
                            <span>Redes Sociais</span>
                          </button>
                        </th>

                        <th
                          scope="col"
                          className="px-9 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                        >
                          Estado
                        </th>

                        <th
                          scope="col"
                          className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                        >
                          Cidade
                        </th>

                        <th
                          scope="col"
                          className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                        >
                          Dono(a) Registrado
                        </th>

                        <th
                          scope="col"
                          className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                        >
                          Editar
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-[#2a2a2a]">
                      {items
                        .filter((item) => item.ownerId === userId) // Filtra os itens com base no ownerId
                        .map((item) => {
                          const { ownerName } = item;
                          return (
                            <tr key={item._id}>
                              <td className="px-12 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                                {item.name}
                              </td>
                              <td className="px-12 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                                {item.cnpj}
                              </td>
                              <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                                {item.social_network}
                              </td>
                              <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                                {item.state}
                              </td>
                              <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                                {item.city}
                              </td>
                              <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                <div className="inline-flex items-center gap-x-3">
                                  <div className="flex items-center gap-x-2">
                                    <img
                                      className="object-cover w-10 h-10 rounded-full"
                                      src={profileImage}
                                      alt=""
                                    />
                                    <div>
                                      <h2 className="font-medium text-gray-800 dark:text-white ">
                                        {ownerName} {/* Alterado para ownerName */}
                                      </h2>
                                      <p className="text-sm font-normal text-gray-600 dark:text-gray-400">
                                        {email} {/* Alterado para email */}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td className="px-4 py-4 text-sm whitespace-nowrap">
                                <div className="flex items-center gap-x-6">
                                  <button
                                    className="text-gray-500 transition-colors duration-200 dark:hover:text-red-500 dark:text-gray-300 hover:text-red-500 focus:outline-none"
                                    onClick={() => handleDeleteItem(item._id)}
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      strokeWidth="1.5"
                                      stroke="currentColor"
                                      className="w-5 h-5"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                      />
                                    </svg>
                                  </button>


                                  <button className="text-gray-500 transition-colors duration-200 dark:hover:text-yellow-500 dark:text-gray-300 hover:text-yellow-500 focus:outline-none">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      strokeWidth="1.5"
                                      stroke="currentColor"
                                      className="w-5 h-5"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                                      />
                                    </svg>
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>

                  </table>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between mt-6">
            <a
              href="#"
              className="flex items-center px-5 py-2 text-sm text-gray-700 capitalize bg-white border rounded-md gap-x-2 hover:bg-gray-100 dark:bg-[#3a3a3a] dark:text-gray-200 dark:border-[#2a2a2a] dark:hover:bg-[#2a2a2a]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-5 h-5 rtl:-scale-x-100"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
                />
              </svg>

              <span>Anterior</span>
            </a>

            <div className="items-center hidden lg:flex gap-x-3">
              <a
                href="#"
                className="px-2 py-1 text-sm text-black rounded-md  bg-black/20"
              >
                1
              </a>
              <a
                href="#"
                className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100"
              >
                ...
              </a>
            </div>

            <a
              href="#"
              className="flex items-center px-5 py-2 text-sm text-gray-700 capitalize bg-white border rounded-md gap-x-2 hover:bg-gray-100 dark:bg-[#3a3a3a] dark:text-gray-200 dark:border-[#2a2a2a] dark:hover:bg-[#2a2a2a]"
            >
              <span>Próxima</span>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-5 h-5 rtl:scale-x-100"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                />
              </svg>
            </a>
          </div>
        </section>




        
      </section>
    </>
  );
};

export default SignCompaniesTable;