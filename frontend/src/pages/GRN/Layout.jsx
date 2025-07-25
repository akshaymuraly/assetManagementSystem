import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import SidebarNavigation from '../../components/Navigation';
import Header from '../../components/Header';
import MainContent from '../../components/MainContent';
import GRNList from '../../components/GRN/GRNList';
import Form from './Form';
import { addVendor,setVendors } from '../../redux/vendorSlice';
import { addBranch, setBranches } from '../../redux/branchSlice';
import { addCategory, setCategories } from '../../redux/catogorySlice';
import { useDispatch } from 'react-redux';
import EntityManager from '../../components/common/EntityManagement';
// import React from 'react';
import { SmileOutlined,ExclamationOutlined } from '@ant-design/icons';
import { Button, notification } from 'antd';

// Layout Component
const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const dispatch = useDispatch();
  const [api, contextHolder] = notification.useNotification();
  const openNotification = (Title,Message,error=false) => {
    api.open({
      message: Title,
      description:Message,
      icon: error?<ExclamationOutlined style={{ color: '#108ee9' }}/>:<SmileOutlined style={{ color: '#108ee9' }} />,
      style:{
        backgroundColor:error? '#f8d7da' : '#d4edda',
      }
    });
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

useEffect(() => {
  async function fetchData() {
    try {
      const vendorsResponse = await fetch('http://localhost:3000/api/v1/vendors');
      const vendors = await vendorsResponse.json();
      dispatch(setVendors(vendors?.data));

      // // Fetch and parse branches
      const branchesResponse = await fetch('http://localhost:3000/api/v1/branches');
      const branches = await branchesResponse.json();
      dispatch(setBranches(branches?.data));

      // // Fetch and parse categories
      const categoriesResponse = await fetch('http://localhost:3000/api/v1/asset-subcategories');
      const categories = await categoriesResponse.json();
      dispatch(setCategories(categories?.data));

      // console.log("DATA FETCHED:", vendors?.data, branches, categories);
    } catch (error) {
      console.error("Error fetching initial data:", error);
    }
  }

  fetchData();
}, []);


  return (
    <div className="app-layout d-flex h-100">
      {/* Sidebar Navigation */}
      <SidebarNavigation isOpen={sidebarOpen} onClose={closeSidebar} />
      
      {/* Main Content Area */}
      <div className="flex-grow-1 d-flex flex-column" style={{ height: '100vh', overflow:"scroll"}}>
        {/* Header */}
        <Header onMenuToggle={toggleSidebar} />
        
        {/* Main Content */}
        <MainContent>
          {contextHolder}
          <Routes>
            <Route path='/transactions' element={<GRNList/>}/>
            <Route path='/transactions/grn' element={<Form openNotification={openNotification}/>} />
            <Route path='/branches' element={<EntityManager
                              entityName="Branch"
                              apiEndpoint="http://localhost:3000/api/v1/branches"
                              fields={[
                                { name: 'name', label: 'Name' },
                                { name: 'code', label: 'Code' },
                                { name: 'location', label: 'Location' },
                                { name: 'status', label: 'Status' }
                              ]}
                              openNotification={openNotification}
              />}/>
            <Route path="/vendors"
                              element={
                                <EntityManager
                                  entityName="Vendor"
                                  apiEndpoint="http://localhost:3000/api/v1/vendors"
                                  fields={[
                                            { name: "name", label: "Vendor Name", type: "text", required: true },
                                            { name: "contact_person", label: "Contact Person", type: "text" },
                                            { name: "email", label: "Email", type: "email" },
                                            { name: "phone", label: "Phone", type: "text" },
                                            { name: "address", label: "Address", type: "textarea" },
                                            { name: "gst_number", label: "GST Number", type: "text" }
                                          ]
                                        }
                                  openNotification={openNotification}
                                />
            }
          />
            <Route path='/categories' 

                                element={<EntityManager  entityName="Categories"
                                  apiEndpoint="http://localhost:3000/api/v1/asset-categories"
                                  fields={[
                                              { name: "name", label: "Category Name", type: "text", required: true },
                                              { name: "description", label: "Description", type: "textarea", required: true }
                                          ]
                                        }
                                  openNotification={openNotification}/>} />
            <Route path='/manufacturers' 

                                element={<EntityManager  entityName="Manufacturers"
                                  apiEndpoint="http://localhost:3000/api/v1/manufacturers"
                                  fields={[
                                              { name: "name", label: "Category Name", type: "text", required: true },
                                              { name: "description", label: "Description", type: "textarea", required: true }
                                          ]
                                        }
                                  openNotification={openNotification}/>} />
          </Routes>
        </MainContent>
      </div>

      <style jsx global>{`
        body {
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
          background-color: #f8f9fa;
        }

        .app-layout {
          min-height: 100vh;
        }

        @media (min-width: 992px) {
          .main-area {
            margin-left: 280px;
          }
        }

        .card {
          border: none;
          box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
        }

        .btn {
          border-radius: 0.375rem;
        }

        .breadcrumb-item + .breadcrumb-item::before {
          content: "›";
          color: #6c757d;
        }

        .table th {
          border-top: none;
          font-weight: 600;
          color: #495057;
        }
      `}</style>
    </div>
  );
};


export default Layout