import Nav from "./Nav";
import {GoGoal} from "react-icons/go";
import {FaClipboardList} from "react-icons/fa";
import {FaMapMarkedAlt} from "react-icons/fa";
import {FaUserFriends} from "react-icons/fa";
import {MdPhotoCamera} from "react-icons/md";
import {FaPlus} from "react-icons/fa";
import {IoIosArrowForward} from "react-icons/io";
import {MdOpenInNew} from "react-icons/md";
import {IoOpenOutline} from "react-icons/io5";
import {useState} from "react";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";
import {LuConstruction} from "react-icons/lu";
import {useLocation, useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import { FaArrowLeft } from "react-icons/fa";
import { updateListData } from "../network/listdatas_api.ts";
import {createListData} from "../network/listdatas_api.ts";
console.log()
async function onSubmitCreateList(ListdataInput) {
    try {
      let ListdataResponse
      if (ListdataInput) {
        ListdataResponse = await createListData(
            ListdataInput
        );
      } else {
        console.log("ListdataInput is empty");
      }
      console.log(ListdataResponse);
    } catch (error) {
      console.error(error);
      alert(error);
    }
  }
async function onSubmitEdit(id, input) {
    try {
      let ListdataResponse
      console.log("id:" + id);
      console.log("input:", input);
      if (input) {
        ListdataResponse = await updateListData(
          id,
          input
        );
      } else {
        console.log("No input data");
      }
      console.log(ListdataResponse);
    } catch (error) {
      console.error(error);
      alert(error);
    }
  }

const getUpdatedFields = (initial, current) => {
        const updatedFields = {};

        Object.keys(initial).forEach(key => {
            if (initial[key] !== current[key]) {
                updatedFields[key] = current[key];  // Only store fields that are updated
            }
        });

        return updatedFields;
    };

function EditBucketListItem() {

    const location = useLocation();
    const {title, country, city, activity, category, budget, actbudget, date, notes, _id} = location.state || {};
    console.log("location state!!" + _id);

    let images = [
            {img: '/catImages/couple.png', cat: 'Adventure/Outdoor'},
            {img: '/catImages/couple.png', cat: 'Water Sports/Beach'},
            {img: '/catImages/dawn.png', cat: 'Cultural/Heritage'},
            {img: '/catImages/girl.png', cat: 'Food & Drink'},
            {img: '/catImages/guy.png', cat: 'Wellness & Relaxation'},
            {img: '/catImages/houses.png', cat: 'Skills & Education'},
        ]

    const [isOpen, setIsOpen] = useState(false);

    const navigate = useNavigate();

    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    const goToInspoPage = () => {
        navigate('/App/Inspiration');
    };

    const goToMapPage = () => {
        navigate('/App/Map');
    };

    const goToFriendsPage = () => {
        navigate('/App/Friends');
    };

    const goToBucketListsPage = () => {
        navigate('/App/BucketLists');
    };

    const validationSchema = Yup.object().shape({
        title: Yup.string()
            .max(60, 'Title max. 60 chars')
            .required('Title is required'),
        country: Yup.string(), // Optional, so no validations
        city: Yup.string(),
        activity: Yup.string()
            .max(70, 'Activity max. 70 chars')
            .required('Activity is required'),
        category: Yup.string().required('Category is required'),
        budget: Yup.number()
            .required('Budget is required')
            .min(0, 'Budget cannot be negative')
            .max(1000000, 'Budget cannot exceed 1,000,000')
            .test('is-decimal', 'Budget must have 2 decimal places', (value) =>
                /^\d+(\.\d{1,2})?$/.test(value)
            ),
        notes: Yup.string()
            .max(250, 'Notes max. 250 chars'),
        date: Yup.date()
            .required('Date is required')
            .nullable()
          .min(new Date(), 'Date must be in the future'),
    });

    const validationSchema2 = Yup.object().shape({
        title: Yup.string()
            .max(60, 'Title max. 60 chars')
            .required('Title is required'),
        country: Yup.string(), // Optional, so no validations
        city: Yup.string(),
        activity: Yup.string()
            .max(70, 'Activity max. 70 chars')
            .required('Activity is required'),
        category: Yup.string().required('Category is required'),
        budget: Yup.number()
            .required('Budget is required')
            .min(0, 'Budget cannot be negative')
            .max(1000000, 'Budget cannot exceed 1,000,000')
            .test('is-decimal', 'Budget must have 2 decimal places', (value) =>
                /^\d+(\.\d{1,2})?$/.test(value)
            ),
        actbudget: Yup.number()
            .min(0, 'Actual Budget cannot be negative')
            .max(1000000, ' Actual Budget cannot exceed 1,000,000')
            .test('is-decimal', 'Actual Budget must have 2 decimal places', (value) =>
                /^\d+(\.\d{1,2})?$/.test(value)
            ),
        notes: Yup.string()
            .max(250, 'Notes max. 250 chars'),
        date: Yup.date()
            .required('Date is required')
            .nullable()
          .min(new Date(), 'Date must be in the future'),
    });

    const initialValues = {
        title: title || '',        // Pre-filled from page 1
        country: country || '',    // Pre-filled from page 1
        city: city || '',          // Pre-filled from page 1
        activity: activity || '',  // Pre-filled from page 1
        category: category || '',  // Pre-filled from page 1
        budget: budget || '',      // Pre-filled from page 1
        actbudget: actbudget || '',// Pre-filled from page 1
        notes: notes || '',        // Pre-filled from page 1
        date: date || '',          // Pre-filled from page 1
    };
    return (

        <div className="w-full flex flex-col h-screen bg-customBg">

            <button
                className="absolute top-0 left-0 px-4 py-3 bg-customPurple text-white rounded-tr rounded-br hover:scale-105"
                onClick={goToBucketListsPage}
            >
                <FaArrowLeft />
            </button>

            <div className="flex-1 flex flex-col justify-center mx-auto w-[40rem]">
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema2}
                    onSubmit={(values) => {
                        console.log(values);

                        console.log('Submitted values:', values);


                        const updatedFields = getUpdatedFields(initialValues, values);

                        console.log("Updated fields:", updatedFields);

                        if (Object.keys(updatedFields).length === 0) {
                            toast.info('No changes detected', {
                                position: "top-right",
                                autoClose: 3000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                            });
                        } else {
                            console.log("Updated fields to send to backend:", updatedFields);

                            onSubmitEdit(_id, values);
                            console.log(_id, values);
                            toast.success('Bucket list item updated successfully!', {
                                position: "top-right",
                                autoClose: 3000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                            });
                            goToBucketListsPage();
                        }
                    }}
                >
                    {({handleSubmit}) => (
                        <Form onSubmit={handleSubmit} className="flex flex-col w-full gap-2">
                            <div className="flex flex-col mx-4">
                                <label>Title</label>
                                <Field
                                    name="title"
                                    type="input"
                                   
                                    className="border-1 rounded-lg focus:outline-customPurple"
                                />
                                <ErrorMessage name="title" component="div"
                                              className="text-red-500 text-sm"/>
                            </div>

                            <div className="flex justify-between mx-4 gap-4">
                                <div className="flex flex-col w-1/2">
                                    <label>Country</label>
                                    <Field
                                        name="country"
                                        as="select"
                                       
                                        className="border-1 rounded-lg focus:outline-customPurple"
                                    >
                                        <option value="" disabled selected hidden>Choose a destination
                                        </option>
                                        <option value="AF">Afghanistan</option>
                                        <option value="AX">Åland Islands</option>
                                        <option value="AL">Albania</option>
                                        <option value="DZ">Algeria</option>
                                        <option value="AS">American Samoa</option>
                                        <option value="AD">Andorra</option>
                                        <option value="AO">Angola</option>
                                        <option value="AI">Anguilla</option>
                                        <option value="AQ">Antarctica</option>
                                        <option value="AG">Antigua and Barbuda</option>
                                        <option value="AR">Argentina</option>
                                        <option value="AM">Armenia</option>
                                        <option value="AW">Aruba</option>
                                        <option value="AU">Australia</option>
                                        <option value="AT">Austria</option>
                                        <option value="AZ">Azerbaijan</option>
                                        <option value="BS">Bahamas</option>
                                        <option value="BH">Bahrain</option>
                                        <option value="BD">Bangladesh</option>
                                        <option value="BB">Barbados</option>
                                        <option value="BY">Belarus</option>
                                        <option value="BE">Belgium</option>
                                        <option value="BZ">Belize</option>
                                        <option value="BJ">Benin</option>
                                        <option value="BM">Bermuda</option>
                                        <option value="BT">Bhutan</option>
                                        <option value="BO">Bolivia</option>
                                        <option value="BA">Bosnia and Herzegovina</option>
                                        <option value="BW">Botswana</option>
                                        <option value="BV">Bouvet Island</option>
                                        <option value="BR">Brazil</option>
                                        <option value="IO">British Indian Ocean Territory</option>
                                        <option value="BN">Brunei Darussalam</option>
                                        <option value="BG">Bulgaria</option>
                                        <option value="BF">Burkina Faso</option>
                                        <option value="BI">Burundi</option>
                                        <option value="KH">Cambodia</option>
                                        <option value="CM">Cameroon</option>
                                        <option value="CA">Canada</option>
                                        <option value="CV">Cape Verde</option>
                                        <option value="KY">Cayman Islands</option>
                                        <option value="CF">Central African Republic</option>
                                        <option value="TD">Chad</option>
                                        <option value="CL">Chile</option>
                                        <option value="CN">China</option>
                                        <option value="CX">Christmas Island</option>
                                        <option value="CC">Cocos (Keeling) Islands</option>
                                        <option value="CO">Colombia</option>
                                        <option value="KM">Comoros</option>
                                        <option value="CG">Congo</option>
                                        <option value="CD">Congo, The Democratic Republic of The
                                        </option>
                                        <option value="CK">Cook Islands</option>
                                        <option value="CR">Costa Rica</option>
                                        <option value="CI">Cote D'ivoire</option>
                                        <option value="HR">Croatia</option>
                                        <option value="CU">Cuba</option>
                                        <option value="CY">Cyprus</option>
                                        <option value="CZ">Czech Republic</option>
                                        <option value="DK">Denmark</option>
                                        <option value="DJ">Djibouti</option>
                                        <option value="DM">Dominica</option>
                                        <option value="DO">Dominican Republic</option>
                                        <option value="EC">Ecuador</option>
                                        <option value="EG">Egypt</option>
                                        <option value="SV">El Salvador</option>
                                        <option value="GQ">Equatorial Guinea</option>
                                        <option value="ER">Eritrea</option>
                                        <option value="EE">Estonia</option>
                                        <option value="ET">Ethiopia</option>
                                        <option value="FK">Falkland Islands (Malvinas)</option>
                                        <option value="FO">Faroe Islands</option>
                                        <option value="FJ">Fiji</option>
                                        <option value="FI">Finland</option>
                                        <option value="FR">France</option>
                                        <option value="GF">French Guiana</option>
                                        <option value="PF">French Polynesia</option>
                                        <option value="TF">French Southern Territories</option>
                                        <option value="GA">Gabon</option>
                                        <option value="GM">Gambia</option>
                                        <option value="GE">Georgia</option>
                                        <option value="DE">Germany</option>
                                        <option value="GH">Ghana</option>
                                        <option value="GI">Gibraltar</option>
                                        <option value="GR">Greece</option>
                                        <option value="GL">Greenland</option>
                                        <option value="GD">Grenada</option>
                                        <option value="GP">Guadeloupe</option>
                                        <option value="GU">Guam</option>
                                        <option value="GT">Guatemala</option>
                                        <option value="GG">Guernsey</option>
                                        <option value="GN">Guinea</option>
                                        <option value="GW">Guinea-bissau</option>
                                        <option value="GY">Guyana</option>
                                        <option value="HT">Haiti</option>
                                        <option value="HM">Heard Island and Mcdonald Islands</option>
                                        <option value="VA">Holy See (Vatican City State)</option>
                                        <option value="HN">Honduras</option>
                                        <option value="HK">Hong Kong</option>
                                        <option value="HU">Hungary</option>
                                        <option value="IS">Iceland</option>
                                        <option value="IN">India</option>
                                        <option value="ID">Indonesia</option>
                                        <option value="IR">Iran, Islamic Republic of</option>
                                        <option value="IQ">Iraq</option>
                                        <option value="IE">Ireland</option>
                                        <option value="IM">Isle of Man</option>
                                        <option value="IL">Israel</option>
                                        <option value="IT">Italy</option>
                                        <option value="JM">Jamaica</option>
                                        <option value="JP">Japan</option>
                                        <option value="JE">Jersey</option>
                                        <option value="JO">Jordan</option>
                                        <option value="KZ">Kazakhstan</option>
                                        <option value="KE">Kenya</option>
                                        <option value="KI">Kiribati</option>
                                        <option value="KP">Korea, Democratic People's Republic of
                                        </option>
                                        <option value="KR">Korea, Republic of</option>
                                        <option value="KW">Kuwait</option>
                                        <option value="KG">Kyrgyzstan</option>
                                        <option value="LA">Lao People's Democratic Republic</option>
                                        <option value="LV">Latvia</option>
                                        <option value="LB">Lebanon</option>
                                        <option value="LS">Lesotho</option>
                                        <option value="LR">Liberia</option>
                                        <option value="LY">Libyan Arab Jamahiriya</option>
                                        <option value="LI">Liechtenstein</option>
                                        <option value="LT">Lithuania</option>
                                        <option value="LU">Luxembourg</option>
                                        <option value="MO">Macao</option>
                                        <option value="MK">Macedonia, The Former Yugoslav Republic of
                                        </option>
                                        <option value="MG">Madagascar</option>
                                        <option value="MW">Malawi</option>
                                        <option value="MY">Malaysia</option>
                                        <option value="MV">Maldives</option>
                                        <option value="ML">Mali</option>
                                        <option value="MT">Malta</option>
                                        <option value="MH">Marshall Islands</option>
                                        <option value="MQ">Martinique</option>
                                        <option value="MR">Mauritania</option>
                                        <option value="MU">Mauritius</option>
                                        <option value="YT">Mayotte</option>
                                        <option value="MX">Mexico</option>
                                        <option value="FM">Micronesia, Federated States of</option>
                                        <option value="MD">Moldova, Republic of</option>
                                        <option value="MC">Monaco</option>
                                        <option value="MN">Mongolia</option>
                                        <option value="ME">Montenegro</option>
                                        <option value="MS">Montserrat</option>
                                        <option value="MA">Morocco</option>
                                        <option value="MZ">Mozambique</option>
                                        <option value="MM">Myanmar</option>
                                        <option value="NA">Namibia</option>
                                        <option value="NR">Nauru</option>
                                        <option value="NP">Nepal</option>
                                        <option value="NL">Netherlands</option>
                                        <option value="AN">Netherlands Antilles</option>
                                        <option value="NC">New Caledonia</option>
                                        <option value="NZ">New Zealand</option>
                                        <option value="NI">Nicaragua</option>
                                        <option value="NE">Niger</option>
                                        <option value="NG">Nigeria</option>
                                        <option value="NU">Niue</option>
                                        <option value="NF">Norfolk Island</option>
                                        <option value="MP">Northern Mariana Islands</option>
                                        <option value="NO">Norway</option>
                                        <option value="OM">Oman</option>
                                        <option value="PK">Pakistan</option>
                                        <option value="PW">Palau</option>
                                        <option value="PS">Palestinian Territory, Occupied</option>
                                        <option value="PA">Panama</option>
                                        <option value="PG">Papua New Guinea</option>
                                        <option value="PY">Paraguay</option>
                                        <option value="PE">Peru</option>
                                        <option value="PH">Philippines</option>
                                        <option value="PN">Pitcairn</option>
                                        <option value="PL">Poland</option>
                                        <option value="PT">Portugal</option>
                                        <option value="PR">Puerto Rico</option>
                                        <option value="QA">Qatar</option>
                                        <option value="RE">Reunion</option>
                                        <option value="RO">Romania</option>
                                        <option value="RU">Russian Federation</option>
                                        <option value="RW">Rwanda</option>
                                        <option value="SH">Saint Helena</option>
                                        <option value="KN">Saint Kitts and Nevis</option>
                                        <option value="LC">Saint Lucia</option>
                                        <option value="PM">Saint Pierre and Miquelon</option>
                                        <option value="VC">Saint Vincent and The Grenadines</option>
                                        <option value="WS">Samoa</option>
                                        <option value="SM">San Marino</option>
                                        <option value="ST">Sao Tome and Principe</option>
                                        <option value="SA">Saudi Arabia</option>
                                        <option value="SN">Senegal</option>
                                        <option value="RS">Serbia</option>
                                        <option value="SC">Seychelles</option>
                                        <option value="SL">Sierra Leone</option>
                                        <option value="SG">Singapore</option>
                                        <option value="SK">Slovakia</option>
                                        <option value="SI">Slovenia</option>
                                        <option value="SB">Solomon Islands</option>
                                        <option value="SO">Somalia</option>
                                        <option value="ZA">South Africa</option>
                                        <option value="GS">South Georgia and The South Sandwich
                                            Islands
                                        </option>
                                        <option value="ES">Spain</option>
                                        <option value="LK">Sri Lanka</option>
                                        <option value="SD">Sudan</option>
                                        <option value="SR">Suriname</option>
                                        <option value="SJ">Svalbard and Jan Mayen</option>
                                        <option value="SZ">Swaziland</option>
                                        <option value="SE">Sweden</option>
                                        <option value="CH">Switzerland</option>
                                        <option value="SY">Syrian Arab Republic</option>
                                        <option value="TW">Taiwan</option>
                                        <option value="TJ">Tajikistan</option>
                                        <option value="TZ">Tanzania, United Republic of</option>
                                        <option value="TH">Thailand</option>
                                        <option value="TL">Timor-leste</option>
                                        <option value="TG">Togo</option>
                                        <option value="TK">Tokelau</option>
                                        <option value="TO">Tonga</option>
                                        <option value="TT">Trinidad and Tobago</option>
                                        <option value="TN">Tunisia</option>
                                        <option value="TR">Turkey</option>
                                        <option value="TM">Turkmenistan</option>
                                        <option value="TC">Turks and Caicos Islands</option>
                                        <option value="TV">Tuvalu</option>
                                        <option value="UG">Uganda</option>
                                        <option value="UA">Ukraine</option>
                                        <option value="AE">United Arab Emirates</option>
                                        <option value="GB">United Kingdom</option>
                                        <option value="GB-SCT">Scotland</option>
                                        <option value="GB-WLS">Wales</option>
                                        <option value="US">United States</option>
                                        <option value="UM">United States Minor Outlying Islands</option>
                                        <option value="UY">Uruguay</option>
                                        <option value="UZ">Uzbekistan</option>
                                        <option value="VU">Vanuatu</option>
                                        <option value="VE">Venezuela</option>
                                        <option value="VN">Viet Nam</option>
                                        <option value="VG">Virgin Islands, British</option>
                                        <option value="VI">Virgin Islands, U.S.</option>
                                        <option value="WF">Wallis and Futuna</option>
                                        <option value="EH">Western Sahara</option>
                                        <option value="YE">Yemen</option>
                                        <option value="ZM">Zambia</option>
                                        <option value="ZW">Zimbabwe</option>
                                    </Field>
                                    <ErrorMessage name="country" component="div"
                                                  className="text-red-500 text-sm"/>
                                </div>

                                <div className="flex flex-col w-1/2">
                                    <label>City</label>
                                    <Field
                                        name="city"
                                        type="input"
                                        
                                        placeholder="city"
                                        className="border-1 rounded-lg focus:outline-customPurple"
                                    >
                                    </Field>
                                    <ErrorMessage name="city" component="div"
                                                  className="text-red-500 text-sm"/>
                                </div>
                            </div>
                            <div className="flex flex-col mx-4">
                                <label>Activity</label>
                                <Field
                                    name="activity"
                                    type="input"
                                    
                                    className="border-1 rounded-lg focus:outline-customPurple"
                                />
                                <ErrorMessage name="activity" component="div"
                                              className="text-red-500 text-sm"/>
                            </div>

                            <div className="flex justify-between mx-4 gap-5">
                                <div className="flex flex-col w-1/2">
                                    <label>Category</label>
                                    <Field
                                        name="category"
                                        as="select"
                                    
                                        className="border-1 rounded-lg focus:outline-customPurple"
                                    >
                                        <option value="Adventure/Outdoor">Adventure/Outdoor</option>
                                        <option value="Water Sports/Beach">Water Sports/Beach</option>
                                        <option value="Cultural/Heritage">Cultural/Heritage</option>
                                        <option value="Food & Drink">Food & Drink</option>
                                        <option value="Wellness & Relaxation">Wellness & Relaxation</option>
                                        <option value="Skills & Education">Skills & Education</option>
                                    </Field>
                                    <ErrorMessage name="category" component="div"
                                                  className="text-red-500 text-sm"/>
                                </div>

                                <div className="flex flex-col w-1/2">
                                    <label>Date</label>
                                    <Field
                                        name="date"
                                        type="date"
                                       
                                        className="border-1 rounded-lg focus:outline-customPurple"
                                    />
                                    <ErrorMessage name="date" component="div"
                                                  className="text-red-500 text-sm"/>
                                </div>

                            </div>

                            <div className="flex justify-between mx-4 gap-2">
                                <div className="relative flex flex-col w-1/4">
                                    <label>Budget</label>
                                    <Field
                                        name="budget"
                                        type="input"
                                        
                                        className=" border-1 rounded-lg focus:outline-customPurple"
                                    />
                                    <span className="absolute right-2 top-[1.55rem] text-black">€</span>
                                    <ErrorMessage name="budget" component="div"
                                                  className="text-red-500 text-sm"/>
                                </div>

                                <div className="relative flex flex-col w-1/4">
                                    <label>Actual Budget</label>
                                    <Field
                                        name="actbudget"
                                        type="input"
                                       
                                        placeholder="600.00"
                                        className=" border-1 rounded-lg focus:outline-customPurple"
                                    />
                                    <span className="absolute right-2 top-[1.55rem] text-black">€</span>
                                    <ErrorMessage name="actbudget" component="div"
                                                  className="text-red-500 text-sm"/>
                                </div>
                            </div>

                            <div className="flex flex-col mx-4">
                                <label>Notes</label>
                                <Field
                                    name="notes"
                                    as="textarea"
                                    placeholder="Some text"
                                   
                                    className="border-1 rounded-lg h-[5rem] focus:outline-customPurple overflow-auto resize-none"
                                    wrap="soft"
                                />
                                <ErrorMessage name="notes" component="div"
                                              className="text-red-500 text-sm"/>
                            </div>

                            <button type="submit"
                                    className="mt-4 px-4 mx-4 py-2 bg-customPurple text-white rounded">
                                Update
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>

            <div
                className="h-20 bg-white fixed-bottom flex flex-row justify-center align-items-center gap-11 sm:gap-14 md:gap-16 lg:gap-20">
                <button className=" rounded-full">
                    <FaClipboardList className="size-7 sm:size-8 text-customPurple"></FaClipboardList>
                </button>
                <button className="group" onClick={goToMapPage}>
                    <FaMapMarkedAlt className="size-7 group-hover:scale-110 sm:size-8"></FaMapMarkedAlt>
                </button>
                <button className="bg-customPurple p-2 rounded-full hover:scale-105"
                        onClick={openModal}>
                    <FaPlus className="size-7 sm:size-8 text-white"></FaPlus>
                </button>
                <button className="group" onClick={goToFriendsPage}>
                    <FaUserFriends className="size-7 group-hover:scale-110 sm:size-8"></FaUserFriends>
                </button>
                <button className="group" onClick={goToInspoPage}>
                    <MdPhotoCamera className="size-7 group-hover:scale-110 sm:size-8"></MdPhotoCamera>
                </button>
            </div>

            {isOpen && (
                <div>
                    {/* Overlay */}
                    <div
                        className="fixed inset-0 bg-black bg-opacity-50 z-40"
                        onClick={closeModal}
                    ></div>

                    {/* Dialog-Fenster */}
                    <div className="fixed inset-0 flex items-center justify-center z-50 font-nonito p-4 sm:p-0">
                        <div className="bg-white pb-8 mb-16 sm:pb-8 rounded-lg shadow-lg w-full sm:w-2/3 xl:w-[48rem] sm:mx-auto max-h-[90vh] overflow-auto">
                            <div>
                                <div className="flex justify-around my-4">
                                    <h2 className="font-bold">Create new Bucket List Item</h2>
                                </div>
                                <Formik
                                    initialValues={{
                                        title: '',        // For the title field
                                        country: '',      // For the country dropdown (optional)
                                        city: '',         // For the city field (optional, but required if country is selected)
                                        activity: '',     // For the activity field
                                        category: '',     // For the category dropdown
                                        budget: '',       // For the budget field (number with 2 decimals)
                                        notes: '',        // For the notes textarea (free text)
                                        date: '',         // For the date field (required)
                                    }}
                                    validationSchema={validationSchema}
                                    onSubmit={(values) => {
                                        onSubmitCreateList(values);
                                        console.log(values);
                                        toast.success('Bucket list item created successfully!', {
                                            position: "top-right",
                                            autoClose: 3000, // Auto close after 3 seconds
                                            hideProgressBar: false,
                                            closeOnClick: true,
                                            pauseOnHover: true,
                                            draggable: true,
                                            progress: undefined,
                                        });
                                        closeModal();
                                    }}
                                >
                                    {({handleSubmit}) => (
                                        <Form onSubmit={handleSubmit} className="flex flex-col w-full gap-2">
                                            <div className="flex flex-col mx-4">
                                                <label>Title</label>
                                                <Field
                                                    name="title"
                                                    type="input"
                                                    placeholder="Scuba Dive in the Great Barrier Reef"
                                                    className="border-1 rounded-lg focus:outline-customPurple"
                                                />
                                                <ErrorMessage name="title" component="div"
                                                              className="text-red-500 text-sm"/>
                                            </div>

                                            <div className="flex justify-between mx-4 gap-4">
                                                <div className="flex flex-col w-2/5 md:w-1/2">
                                                    <label>Country</label>
                                                    <Field
                                                        name="country"
                                                        as="select"
                                                        placeholder="Australia"
                                                        className="border-1 rounded-lg focus:outline-customPurple"
                                                    >
                                                        <option value="" disabled selected hidden>Choose a destination</option>
                                                        <option value="AF">Afghanistan</option>
                                                        <option value="AX">Åland Islands</option>
                                                        <option value="AL">Albania</option>
                                                        <option value="DZ">Algeria</option>
                                                        <option value="AS">American Samoa</option>
                                                        <option value="AD">Andorra</option>
                                                        <option value="AO">Angola</option>
                                                        <option value="AI">Anguilla</option>
                                                        <option value="AQ">Antarctica</option>
                                                        <option value="AG">Antigua and Barbuda</option>
                                                        <option value="AR">Argentina</option>
                                                        <option value="AM">Armenia</option>
                                                        <option value="AW">Aruba</option>
                                                        <option value="AU">Australia</option>
                                                        <option value="AT">Austria</option>
                                                        <option value="AZ">Azerbaijan</option>
                                                        <option value="BS">Bahamas</option>
                                                        <option value="BH">Bahrain</option>
                                                        <option value="BD">Bangladesh</option>
                                                        <option value="BB">Barbados</option>
                                                        <option value="BY">Belarus</option>
                                                        <option value="BE">Belgium</option>
                                                        <option value="BZ">Belize</option>
                                                        <option value="BJ">Benin</option>
                                                        <option value="BM">Bermuda</option>
                                                        <option value="BT">Bhutan</option>
                                                        <option value="BO">Bolivia</option>
                                                        <option value="BA">Bosnia and Herzegovina</option>
                                                        <option value="BW">Botswana</option>
                                                        <option value="BV">Bouvet Island</option>
                                                        <option value="BR">Brazil</option>
                                                        <option value="IO">British Indian Ocean Territory</option>
                                                        <option value="BN">Brunei Darussalam</option>
                                                        <option value="BG">Bulgaria</option>
                                                        <option value="BF">Burkina Faso</option>
                                                        <option value="BI">Burundi</option>
                                                        <option value="KH">Cambodia</option>
                                                        <option value="CM">Cameroon</option>
                                                        <option value="CA">Canada</option>
                                                        <option value="CV">Cape Verde</option>
                                                        <option value="KY">Cayman Islands</option>
                                                        <option value="CF">Central African Republic</option>
                                                        <option value="TD">Chad</option>
                                                        <option value="CL">Chile</option>
                                                        <option value="CN">China</option>
                                                        <option value="CX">Christmas Island</option>
                                                        <option value="CC">Cocos (Keeling) Islands</option>
                                                        <option value="CO">Colombia</option>
                                                        <option value="KM">Comoros</option>
                                                        <option value="CG">Congo</option>
                                                        <option value="CD">Congo, The Democratic Republic of The</option>
                                                        <option value="CK">Cook Islands</option>
                                                        <option value="CR">Costa Rica</option>
                                                        <option value="CI">Cote D'ivoire</option>
                                                        <option value="HR">Croatia</option>
                                                        <option value="CU">Cuba</option>
                                                        <option value="CY">Cyprus</option>
                                                        <option value="CZ">Czech Republic</option>
                                                        <option value="DK">Denmark</option>
                                                        <option value="DJ">Djibouti</option>
                                                        <option value="DM">Dominica</option>
                                                        <option value="DO">Dominican Republic</option>
                                                        <option value="EC">Ecuador</option>
                                                        <option value="EG">Egypt</option>
                                                        <option value="SV">El Salvador</option>
                                                        <option value="GQ">Equatorial Guinea</option>
                                                        <option value="ER">Eritrea</option>
                                                        <option value="EE">Estonia</option>
                                                        <option value="ET">Ethiopia</option>
                                                        <option value="FK">Falkland Islands (Malvinas)</option>
                                                        <option value="FO">Faroe Islands</option>
                                                        <option value="FJ">Fiji</option>
                                                        <option value="FI">Finland</option>
                                                        <option value="FR">France</option>
                                                        <option value="GF">French Guiana</option>
                                                        <option value="PF">French Polynesia</option>
                                                        <option value="TF">French Southern Territories</option>
                                                        <option value="GA">Gabon</option>
                                                        <option value="GM">Gambia</option>
                                                        <option value="GE">Georgia</option>
                                                        <option value="DE">Germany</option>
                                                        <option value="GH">Ghana</option>
                                                        <option value="GI">Gibraltar</option>
                                                        <option value="GR">Greece</option>
                                                        <option value="GL">Greenland</option>
                                                        <option value="GD">Grenada</option>
                                                        <option value="GP">Guadeloupe</option>
                                                        <option value="GU">Guam</option>
                                                        <option value="GT">Guatemala</option>
                                                        <option value="GG">Guernsey</option>
                                                        <option value="GN">Guinea</option>
                                                        <option value="GW">Guinea-bissau</option>
                                                        <option value="GY">Guyana</option>
                                                        <option value="HT">Haiti</option>
                                                        <option value="HM">Heard Island and Mcdonald Islands</option>
                                                        <option value="VA">Holy See (Vatican City State)</option>
                                                        <option value="HN">Honduras</option>
                                                        <option value="HK">Hong Kong</option>
                                                        <option value="HU">Hungary</option>
                                                        <option value="IS">Iceland</option>
                                                        <option value="IN">India</option>
                                                        <option value="ID">Indonesia</option>
                                                        <option value="IR">Iran, Islamic Republic of</option>
                                                        <option value="IQ">Iraq</option>
                                                        <option value="IE">Ireland</option>
                                                        <option value="IM">Isle of Man</option>
                                                        <option value="IL">Israel</option>
                                                        <option value="IT">Italy</option>
                                                        <option value="JM">Jamaica</option>
                                                        <option value="JP">Japan</option>
                                                        <option value="JE">Jersey</option>
                                                        <option value="JO">Jordan</option>
                                                        <option value="KZ">Kazakhstan</option>
                                                        <option value="KE">Kenya</option>
                                                        <option value="KI">Kiribati</option>
                                                        <option value="KP">Korea, Democratic People's Republic of</option>
                                                        <option value="KR">Korea, Republic of</option>
                                                        <option value="KW">Kuwait</option>
                                                        <option value="KG">Kyrgyzstan</option>
                                                        <option value="LA">Lao People's Democratic Republic</option>
                                                        <option value="LV">Latvia</option>
                                                        <option value="LB">Lebanon</option>
                                                        <option value="LS">Lesotho</option>
                                                        <option value="LR">Liberia</option>
                                                        <option value="LY">Libyan Arab Jamahiriya</option>
                                                        <option value="LI">Liechtenstein</option>
                                                        <option value="LT">Lithuania</option>
                                                        <option value="LU">Luxembourg</option>
                                                        <option value="MO">Macao</option>
                                                        <option value="MK">Macedonia, The Former Yugoslav Republic of</option>
                                                        <option value="MG">Madagascar</option>
                                                        <option value="MW">Malawi</option>
                                                        <option value="MY">Malaysia</option>
                                                        <option value="MV">Maldives</option>
                                                        <option value="ML">Mali</option>
                                                        <option value="MT">Malta</option>
                                                        <option value="MH">Marshall Islands</option>
                                                        <option value="MQ">Martinique</option>
                                                        <option value="MR">Mauritania</option>
                                                        <option value="MU">Mauritius</option>
                                                        <option value="YT">Mayotte</option>
                                                        <option value="MX">Mexico</option>
                                                        <option value="FM">Micronesia, Federated States of</option>
                                                        <option value="MD">Moldova, Republic of</option>
                                                        <option value="MC">Monaco</option>
                                                        <option value="MN">Mongolia</option>
                                                        <option value="ME">Montenegro</option>
                                                        <option value="MS">Montserrat</option>
                                                        <option value="MA">Morocco</option>
                                                        <option value="MZ">Mozambique</option>
                                                        <option value="MM">Myanmar</option>
                                                        <option value="NA">Namibia</option>
                                                        <option value="NR">Nauru</option>
                                                        <option value="NP">Nepal</option>
                                                        <option value="NL">Netherlands</option>
                                                        <option value="AN">Netherlands Antilles</option>
                                                        <option value="NC">New Caledonia</option>
                                                        <option value="NZ">New Zealand</option>
                                                        <option value="NI">Nicaragua</option>
                                                        <option value="NE">Niger</option>
                                                        <option value="NG">Nigeria</option>
                                                        <option value="NU">Niue</option>
                                                        <option value="NF">Norfolk Island</option>
                                                        <option value="MP">Northern Mariana Islands</option>
                                                        <option value="NO">Norway</option>
                                                        <option value="OM">Oman</option>
                                                        <option value="PK">Pakistan</option>
                                                        <option value="PW">Palau</option>
                                                        <option value="PS">Palestinian Territory, Occupied</option>
                                                        <option value="PA">Panama</option>
                                                        <option value="PG">Papua New Guinea</option>
                                                        <option value="PY">Paraguay</option>
                                                        <option value="PE">Peru</option>
                                                        <option value="PH">Philippines</option>
                                                        <option value="PN">Pitcairn</option>
                                                        <option value="PL">Poland</option>
                                                        <option value="PT">Portugal</option>
                                                        <option value="PR">Puerto Rico</option>
                                                        <option value="QA">Qatar</option>
                                                        <option value="RE">Reunion</option>
                                                        <option value="RO">Romania</option>
                                                        <option value="RU">Russian Federation</option>
                                                        <option value="RW">Rwanda</option>
                                                        <option value="SH">Saint Helena</option>
                                                        <option value="KN">Saint Kitts and Nevis</option>
                                                        <option value="LC">Saint Lucia</option>
                                                        <option value="PM">Saint Pierre and Miquelon</option>
                                                        <option value="VC">Saint Vincent and The Grenadines</option>
                                                        <option value="WS">Samoa</option>
                                                        <option value="SM">San Marino</option>
                                                        <option value="ST">Sao Tome and Principe</option>
                                                        <option value="SA">Saudi Arabia</option>
                                                        <option value="SN">Senegal</option>
                                                        <option value="RS">Serbia</option>
                                                        <option value="SC">Seychelles</option>
                                                        <option value="SL">Sierra Leone</option>
                                                        <option value="SG">Singapore</option>
                                                        <option value="SK">Slovakia</option>
                                                        <option value="SI">Slovenia</option>
                                                        <option value="SB">Solomon Islands</option>
                                                        <option value="SO">Somalia</option>
                                                        <option value="ZA">South Africa</option>
                                                        <option value="GS">South Georgia and The South Sandwich Islands</option>
                                                        <option value="ES">Spain</option>
                                                        <option value="LK">Sri Lanka</option>
                                                        <option value="SD">Sudan</option>
                                                        <option value="SR">Suriname</option>
                                                        <option value="SJ">Svalbard and Jan Mayen</option>
                                                        <option value="SZ">Swaziland</option>
                                                        <option value="SE">Sweden</option>
                                                        <option value="CH">Switzerland</option>
                                                        <option value="SY">Syrian Arab Republic</option>
                                                        <option value="TW">Taiwan</option>
                                                        <option value="TJ">Tajikistan</option>
                                                        <option value="TZ">Tanzania, United Republic of</option>
                                                        <option value="TH">Thailand</option>
                                                        <option value="TL">Timor-leste</option>
                                                        <option value="TG">Togo</option>
                                                        <option value="TK">Tokelau</option>
                                                        <option value="TO">Tonga</option>
                                                        <option value="TT">Trinidad and Tobago</option>
                                                        <option value="TN">Tunisia</option>
                                                        <option value="TR">Turkey</option>
                                                        <option value="TM">Turkmenistan</option>
                                                        <option value="TC">Turks and Caicos Islands</option>
                                                        <option value="TV">Tuvalu</option>
                                                        <option value="UG">Uganda</option>
                                                        <option value="UA">Ukraine</option>
                                                        <option value="AE">United Arab Emirates</option>
                                                        <option value="GB">United Kingdom</option>
                                                        <option value="GB-SCT">Scotland</option>
                                                        <option value="GB-WLS">Wales</option>
                                                        <option value="US">United States</option>
                                                        <option value="UM">United States Minor Outlying Islands</option>
                                                        <option value="UY">Uruguay</option>
                                                        <option value="UZ">Uzbekistan</option>
                                                        <option value="VU">Vanuatu</option>
                                                        <option value="VE">Venezuela</option>
                                                        <option value="VN">Viet Nam</option>
                                                        <option value="VG">Virgin Islands, British</option>
                                                        <option value="VI">Virgin Islands, U.S.</option>
                                                        <option value="WF">Wallis and Futuna</option>
                                                        <option value="EH">Western Sahara</option>
                                                        <option value="YE">Yemen</option>
                                                        <option value="ZM">Zambia</option>
                                                        <option value="ZW">Zimbabwe</option>
                                                    </Field>
                                                    <ErrorMessage name="country" component="div"
                                                                  className="text-red-500 text-sm"/>
                                                </div>

                                                <div className="flex flex-col w-2/5 md:w-1/2">
                                                    <label>City</label>
                                                    <Field
                                                        name="city"
                                                        type="input"
                                                        placeholder="Cairns"
                                                        className="border-1 rounded-lg focus:outline-customPurple"
                                                    >
                                                    </Field>
                                                    <ErrorMessage name="city" component="div"
                                                                  className="text-red-500 text-sm"/>
                                                </div>
                                            </div>
                                            <div className="flex flex-col mx-4">
                                                <label>Activity</label>
                                                <Field
                                                    name="activity"
                                                    type="input"
                                                    placeholder="Guided Scuba Diving Tour in the Coral Sea"
                                                    className="border-1 rounded-lg focus:outline-customPurple"
                                                />
                                                <ErrorMessage name="activity" component="div"
                                                              className="text-red-500 text-sm"/>
                                            </div>

                                            <div className="flex justify-between mx-4 gap-2">
                                                <div className="flex flex-col w-2/5">
                                                    <label>Category</label>
                                                    <Field
                                                        name="category"
                                                        as="select"
                                                        placeholder="Water Sports/Beach"
                                                        className="border-1 rounded-lg focus:outline-customPurple"
                                                    >
                                                        <option value="" disabled selected hidden>Choose a category</option>
                                                        <option>Adventure/Outdoor</option>
                                                        <option>Water Sports/Beach</option>
                                                        <option>Cultural/Heritage</option>
                                                        <option>Food & Drink</option>
                                                        <option>Wellness & Relaxation</option>
                                                        <option>Skills & Education</option>
                                                    </Field>
                                                    <ErrorMessage name="category" component="div"
                                                                  className="text-red-500 text-sm"/>
                                                </div>


                                                <div className="relative flex flex-col w-1/4">
                                                    <label>Budget</label>
                                                    <Field
                                                        name="budget"
                                                        type="input"
                                                        placeholder="600.00"
                                                        className=" border-1 rounded-lg focus:outline-customPurple"
                                                    />
                                                    <span className="absolute right-1 top-[1.55rem] text-black">€</span>
                                                    <ErrorMessage name="budget" component="div"
                                                                  className="text-red-500 text-sm"/>
                                                </div>

                                                <div className="flex flex-col w-1/4">
                                                    <label>Date</label>
                                                    <Field
                                                        name="date"
                                                        type="date"
                                                        placeholder="July 2025"
                                                        className="border-1 rounded-lg focus:outline-customPurple"
                                                    />
                                                    <ErrorMessage name="date" component="div"
                                                                  className="text-red-500 text-sm"/>
                                                </div>

                                            </div>
                                            <div className="flex flex-col mx-4">
                                                <label>Notes</label>
                                                <Field
                                                    name="notes"
                                                    as="textarea"
                                                    placeholder="This has been a lifelong dream! Exploring the vibrant coral reefs and diverse marine life of the Great Barrier Reef is a must-do for any ocean lover."
                                                    className="border-1 rounded-lg h-[5rem] focus:outline-customPurple overflow-auto resize-none"
                                                    wrap="soft"
                                                />
                                                <ErrorMessage name="notes" component="div"
                                                              className="text-red-500 text-sm"/>
                                            </div>

                                            <button type="submit"
                                                    className="mt-4 px-4 mx-4 py-2 bg-customPurple text-white rounded">
                                                Submit
                                            </button>
                                            <button className="mt-2 px-4 mx-4 py-2 bg-gray-500 text-white rounded"
                                                    onClick={closeModal}>
                                                Close
                                            </button>
                                        </Form>
                                    )}
                                </Formik>
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </div>
    )
}

export default EditBucketListItem;
