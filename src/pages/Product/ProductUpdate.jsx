import { Button, Input, Option, Select, Textarea } from "@material-tailwind/react";
import { Formik } from "formik";
import { useGetProductQuery, useUpdateProductMutation } from "./productApi.js";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router";
import { baseUrl } from "../../app/apiUrl.js";
import * as Yup from 'yup';


const valSchema = Yup.object({
  title: Yup.string().min(10).required(),
  price: Yup.number().required(),
  stock: Yup.number().required(),
  description: Yup.string().min(10).max(500).required(),
  category: Yup.string().required(),
  image: Yup.mixed().test('fileType', 'Unsupported File Format', (val) => val ? ['image/jpeg', 'image/png', 'image/jpg', 'image/webp', 'image/gif'].includes(val.type) : true),
  brand: Yup.string().required(),
})

export default function ProductUpdate() {
  const { id } = useParams();
  const { isLoading, data, error } = useGetProductQuery(id);

  const [updateProduct, { isLoading: isLoad }] = useUpdateProductMutation();
  const nav = useNavigate();
  const { user } = useSelector((state) => state.userSlice);

  if (isLoading) return <h1>Loading....</h1>
  if (error) return <h1>{error.data}</h1>


  return (
    <div>

      <Formik
        initialValues={{
          title: data.title,
          price: data.price,
          stock: data.stock,
          description: data.description,
          category: data.category,
          image: '',
          brand: data.brand,
          imagePrev: data.image
        }}
        onSubmit={async (val) => {

          const formData = new FormData();

          formData.append('title', val.title);
          formData.append('price', Number(val.price));
          formData.append('stock', Number(val.stock));
          formData.append('description', val.description);
          formData.append('category', val.category);
          formData.append('brand', val.brand);
          if (val.image) {
            formData.append('image', val.image);
          }
          try {
            await updateProduct({ data: formData, token: user.token, id: id }).unwrap();
            toast.success('Product updated successfully');
            nav(-1);
          } catch (err) {
            console.log(err);
            toast.error(err.data || err.data.message);
          }
        }}
        validationSchema={valSchema}

      >

        {({ handleChange, values, touched, errors, setFieldValue, handleSubmit }) => (

          <form onSubmit={handleSubmit} className="max-w-[400px] space-y-5">

            <div>
              <Input
                onChange={handleChange}
                name="title"
                value={values.title}
                label="Title" />
              {errors.title && touched.title && <h1 className="text-red-500">{errors.title}</h1>}
            </div>

            <div>
              <Input
                onChange={handleChange}
                name="price"
                value={values.price}
                label="Price"
              />
              {errors.price && touched.price && <h1 className="text-red-500">{errors.price}</h1>}
            </div>

            <div>
              <Input
                onChange={handleChange}
                name="stock"
                value={values.stock}
                label="Stock"
              />
              {errors.stock && touched.stock && <h1 className="text-red-500">{errors.stock}</h1>}
            </div>


            <div>
              <Select
                value={values.category}
                onChange={(e) => setFieldValue('category', e)}
                name="category" label="Category">
                <Option value="men's clothing">men's clothing</Option>
                <Option value="women's clothing">women's clothing</Option>
                <Option value="electronics">electronics</Option>
                <Option value="beauty">beauty</Option>
              </Select>
              {errors.category && touched.category && <h1 className="text-red-500">{errors.category}</h1>}
            </div>

            <div>
              <Select
                value={values.brand}
                onChange={(e) => setFieldValue('brand', e)}
                name="brand" label="Brand">
                <Option value="nike">nike</Option>
                <Option value="addidas">addidas</Option>
                <Option value="samsung">samsung</Option>
                <Option value="iphone">iphone</Option>
                <Option value="gucci">gucci</Option>
                <Option value="sunsilk">sunsilk</Option>
                <Option value="himalayan">himalayan</Option>

              </Select>
              {errors.brand && touched.brand && <h1 className="text-red-500">{errors.brand}</h1>}
            </div>


            <div>
              <Textarea
                onChange={handleChange}
                name="description" value={values.description} label="Description" />
              {errors.description && touched.description && <h1 className="text-red-500">{errors.description}</h1>}
            </div>

            <div className="">
              <Input
                label="Select an Image"
                type="file"
                name="image"
                onChange={(e) => {
                  const file = e.target.files[0];
                  setFieldValue('imagePrev', URL.createObjectURL(file));
                  setFieldValue('image', file);


                }}

              />
              {errors.image && touched.image && <h1 className="text-red-500">{errors.image}</h1>}

              {!errors.image && values.imagePrev && <img src={values.image ? values.imagePrev : `${baseUrl}/${values.imagePrev}`} className="h-[200px] mt-4" alt="" />}

            </div>

            <Button loading={isLoad} type="submit">Submit</Button>


          </form>
        )}


      </Formik>

    </div>
  )
}
