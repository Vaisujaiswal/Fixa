import React, { useContext, useState } from 'react'
import { assets } from '../../assets/assets'
import { AdminContext } from '../../context/AdminContext';
import { toast } from 'react-toastify';
import axios from 'axios';

const AddProvider = () => {

  const [docImg, setDocImg] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [experience, setExperience] = useState('1 Year');
  const [fees, setFees] = useState('');
  const [speciality, setSpeciality] = useState('Photographer');
  const [location, setLocation] = useState('');
  const [addressLine1, setAddressLine1] = useState('');
  const [addressLine2, setAddressLine2] = useState('');
  const [title, setTitle] = useState('');
  const [about, setAbout] = useState('');

  const { backendUrl, aToken } = useContext(AdminContext);


  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {

      if (!docImg) {
        return toast.error('Please upload provider image');
      }

      const formData = new FormData();

      formData.append('image', docImg);
      formData.append('name', name);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('experience', experience);
      formData.append('fees', Number(fees));
      formData.append('speciality', speciality);
      formData.append('location', location);
      formData.append('address', JSON.stringify({ line1: addressLine1, line2: addressLine2 }));
      formData.append('title', title);
      formData.append('description', about);

      // console .log(formData);

      formData.forEach((value, key) => {
        console.log(`${key}, ${value}`);
      });

      console.log("aToken in AddProvider:", aToken);

      const { data } = await axios.post(backendUrl + '/api/admin/add-provider', formData, { headers: { aToken } });

      if (data.success) {
        toast.success(data.message);
        setDocImg(false);
        setName('');
        setEmail('');
        setPassword('');
        setExperience('1 Year');
        setFees('');
        setSpeciality('Photographer');
        setLocation('');
        setAddressLine1('');
        setAddressLine2('');
        setTitle('');
        setAbout('');

      } else {
        toast.error(data.message);
      }

    } catch (error) {

      toast.error(error.message);
      console.log(error);

    }


  }



  return (


    <form onSubmit={onSubmitHandler} className="m-8 w-full">
      <p className="mb-3 text-lg font-medium text-gray-800 dark:text-gray-100">
        Add Provider
      </p>

      <div className="bg-white dark:bg-gray-900 px-8 py-8 border border-gray-200 dark:border-gray-700 rounded w-full max-w-4xl max-h-[70vh] overflow-y-auto shadow-lg">
        <div className="flex items-center gap-8 mb-8 text-gray-600 dark:text-gray-300">
          <label htmlFor="doc-img">
            <img
              className="w-12 h-12 md:w-28 md:h-28 rounded-full border-4 border-blue-400 object-cover shadow-lg transition-transform transform hover:scale-105"
              src={docImg ? URL.createObjectURL(docImg) : assets.defaultImage}
              alt=""
            />
          </label>
          <input
            onChange={(e) => setDocImg(e.target.files[0])}
            type="file"
            id="doc-img"
            hidden
          />
          <p>Upload provider <br /> Image</p>
        </div>

        <div className="flex flex-col lg:flex-row items-start gap-10 text-gray-700 dark:text-gray-300">
          <div className="w-full lg:flex-1 flex flex-col gap-6">
            <div className="flex-1 flex flex-col gap-2">
              <p>Provider Name</p>
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                className="mt-1 w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:outline-none"
                type="text"
                placeholder="Enter provider name"
                required
              />
            </div>

            <div className="flex-1 flex flex-col gap-2">
              <p>Provider Email</p>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className="mt-1 w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:outline-none"
                type="email"
                placeholder="Enter provider email"
                required
              />
            </div>

            <div className="flex-1 flex flex-col gap-2">
              <p>Provider Password</p>
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className="mt-1 w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:outline-none"
                type="password"
                placeholder="password"
                required
              />
            </div>

            <div className="flex-1 flex flex-col gap-2">
              <p>Provider Experience</p>
              <select
                onChange={(e) => setExperience(e.target.value)}
                value={experience}
                className="mt-1 w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:outline-none"
                required
              >
                <option value="1 Year">1 Year</option>
                <option value="2 Year">2 Year</option>
                <option value="3 Year">3 Year</option>
                <option value="4 Year">4 Year</option>
                <option value="5 Year">5 Year</option>
                <option value="6 Year">6 Year</option>
                <option value="7 Year">7 Year</option>
                <option value="8 Year">8 Year</option>
                <option value="9 Year">9 Year</option>
                <option value="10 Year">10 Year</option>
              </select>
            </div>

            <div className="flex-1 flex flex-col gap-2">
              <p>Fees</p>
              <input
                onChange={(e) => setFees(e.target.value)}
                value={fees}
                className="mt-1 w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:outline-none"
                type="number"
                placeholder="fees"
                required
              />
            </div>
          </div>

          <div className="w-full lg:flex-1 flex flex-col gap-6">
            <div className="flex-1 flex flex-col gap-2">
              <p>Speciality</p>
              <select
                onChange={(e) => setSpeciality(e.target.value)}
                value={speciality}
                className="mt-1 w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:outline-none"
              >
                <option value="Photographer">Photographer</option>
                <option value="Laundry">Laundry</option>
                <option value="Pest Control">Pest Control</option>
                <option value="Cook">Cook</option>
                <option value="Beautician">Beautician</option>
                <option value="Carpenter">Carpenter</option>
                <option value="Home Cleaning">Home Cleaner</option>
                <option value="Painter">Painter</option>
                <option value="Electrician">Electrician</option>
                <option value="Plumber">Plumber</option>
                <option value="CCTV Installer">CCTV Installer</option>
                <option value="Computer Repair">Computer Repair</option>
                <option value="Packers & Movers">Packers & Movers</option>
                <option value="Mechanic">Mechanic</option>
                <option value="AC Technician">moverAC Technician</option>
              </select>
            </div>

            <div className="flex-1 flex flex-col gap-2">
              <p>Location</p>
              <input
                onChange={(e) => setLocation(e.target.value)}
                value={location}
                className="mt-1 w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:outline-none"
                type="text"
                placeholder="mumbai"
                required
              />
            </div>

            <div className="flex-1 flex flex-col gap-2">
              <p>Address</p>
              <input
                onChange={(e) => setAddressLine1(e.target.value)}
                value={addressLine1}
                className="mt-1 w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:outline-none"
                type="text"
                placeholder="line 1"
                required
              />
              <input
                onChange={(e) => setAddressLine2(e.target.value)}
                value={addressLine2}
                className="mt-1 w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:outline-none"
                type="text"
                placeholder="line 2"
                required
              />
            </div>

            <div className="flex-1 flex flex-col gap-2">
              <p>Title</p>
              <input
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                className="mt-1 w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:outline-none"
                type="text"
                placeholder="Make Your Home glad with my design in walls(painter)"
                required
              />
            </div>
          </div>
        </div>

        <div className="mt-4 mb-2">
          <p className='dark:text-gray-100 text-gray-700'>About</p>
          <textarea
            onChange={(e) => setAbout(e.target.value)}
            value={about}
            className="mt-1 w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:outline-none"
            placeholder="Write about provider"
            rows={5}
            required
          />
        </div>

        <button
          type="submit"
          className="bg-primary text-white px-10 py-2 rounded-full hover:opacity-90 transition"
        >
          Add Provider
        </button>
      </div>
    </form>

  )
}

export default AddProvider
