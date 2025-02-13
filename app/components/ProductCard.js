
import { Box, Typography, Card, CardContent, CardMedia, Button, TextField } from "@mui/material";
import React from "react";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';


function ProductCard({ product, sendUpdatedProduct, sendDeletedProduct }) {
  const [open, setOpen] = React.useState(false);
  const [updateOpen, setUpdateOpen] = React.useState(false);
  const [image, setImage] = React.useState(null);

  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });
  const handleFileChange = (event) => {
    const file = event.target.files[0]; // Get only the first file
    if (file) {
      setImage({
        name: file.name,
        url: URL.createObjectURL(file),
      });
    } else {
      setImage(null);
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleUpdateClickOpen = () => {
    setUpdateOpen(true);
  };

  const handleUpdateClose = () => {
    setUpdateOpen(false);
  };

  const handleClickDelete = () => {
    sendDeletedProduct(product);
    setOpen(false);
    console.log("Deleted Product:-")
    console.log(product)
  }
  return (
    <Card className=" m-4 rounded-lg shadow-md hover:shadow-lg transition duration-300  grid grid-cols-1 grid-rows-20" sx={{ maxWidth: 245 }}>
      <CardMedia
        component="img"

        height={200}
        image={product.image}
        alt={product.title}
        className="object-contain p-4 row-span-9"
      />
      <CardContent className="row-span-3">
        <Typography variant="h6" className=" w-full truncate font-semibold">
          {product.title}
        </Typography>
        <Typography variant="body2" color="textSecondary" className="w-full line-clamp-2 my-2 row-span-6">
          {product.description}
        </Typography>
        <Typography variant="h6" className="font-bold text-green-600 row-span-1">
          $ {product.price}
        </Typography>
      </CardContent>
      <CardContent className="flex justify-evenly">
        {/* <Button variant="contained" onClick={handleClickUpdate} className="w-15 h-10">
          Update
        </Button > */}
        <Box>
          <React.Fragment>
            <Button variant="contained" onClick={handleUpdateClickOpen} className="w-15 h-10">
              Update
            </Button>
            <Dialog
              open={updateOpen}
              onClose={handleUpdateClose}
              slotProps={{
                paper: {
                  component: 'form',
                  onSubmit: (event) => {
                    event.preventDefault();
                    const formData = new FormData(event.currentTarget);
                    const formJson = Object.fromEntries(formData.entries());
                    const updatedProduct = {
                      id: product.id,
                      title: formJson.productTitle,
                      price: formJson.productPrice,
                      description: formJson.productDescription,
                      category: product.category,
                      image: image.url,
                      rating: product.rating
                    }
                    console.log("From update Product--->");
                    console.log(updatedProduct);
                    sendUpdatedProduct(updatedProduct)
                    handleUpdateClose();
                  },
                },
              }}
            >
              <DialogTitle>Update Product</DialogTitle>
              <DialogContent>

                <TextField
                  focused
                  required
                  margin="dense"
                  id="productTitle"
                  name="productTitle"
                  label="Product Title"
                  type="text"
                  fullWidth
                  variant="standard"
                  defaultValue={product.title}
                />
                <TextField
                 focused
                  required
                  margin="dense"
                  id="productDescription"
                  name="productDescription"
                  label="Product Description"
                  type="text"
                  fullWidth
                  variant="standard"
                  defaultValue={product.description}
                />
                <TextField
                  focused
                  required
                  margin="dense"
                  id="productPrice"
                  name="productPrice"
                  label="Product Price"
                  type="number"
                  fullWidth
                  variant="standard"
                  defaultValue={product.price}
                />

                <Stack spacing={2} alignItems="start">
                  <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
                    Upload Product Image
                    <VisuallyHiddenInput type="file" accept="image/*" onChange={handleFileChange} />
                  </Button>

                  {image && (
                    <Stack spacing={1} alignItems="center">
                      <Avatar src={image.url} alt={image.name} variant="rounded" sx={{ width: 100, height: 100 }} />
                      <Typography variant="caption">{image.name}</Typography>
                    </Stack>
                  )}
                </Stack>

              </DialogContent>
              <DialogActions>
                <Button onClick={handleUpdateClose}>Cancel</Button>
                <Button type="submit">Update</Button>
              </DialogActions>
            </Dialog>
          </React.Fragment>
        </Box>

        <Box >
          <React.Fragment>
            <Button variant="outlined" onClick={handleClickOpen} className="w-15 h-10">
              Remove
            </Button>
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                {`Remove`}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  Do you want to remove {product.title}?....
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>cancel</Button>
                <Button onClick={handleClickDelete} autoFocus>
                  Remove
                </Button>
              </DialogActions>
            </Dialog>
          </React.Fragment>
        </Box>
      </CardContent>
    </Card>
  );
}

export default ProductCard;
