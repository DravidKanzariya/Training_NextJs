import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';



export default function AddProduct(props) {
    const [open, setOpen] = React.useState(false);
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

    return (
        <React.Fragment>
            <Button variant="contained" onClick={handleClickOpen}>
                Add Product
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                slotProps={{
                    paper: {
                        component: 'form',
                        onSubmit: (event) => {
                            event.preventDefault();
                            const formData = new FormData(event.currentTarget);
                            const formJson = Object.fromEntries(formData.entries());
                            const addedProduct = {
                                id: 31,
                                title: formJson.productTitle,
                                price: formJson.productPrice,
                                description: formJson.productDescription,
                                category: props.category,
                                image: image.url,
                                rating:{ rate: 4.6, count: 400 }
                            }
                            console.log("From Add Product--->");
                            console.log(addedProduct);
                            props.sendAddedProduct(addedProduct)
                            handleClose();
                        },
                    },
                }}
            >
                <DialogTitle>Add Product</DialogTitle>
                <DialogContent>

                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="productTitle"
                        name="productTitle"
                        label="Product Title"
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="productDescription"
                        name="productDescription"
                        label="Product Description"
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="productPrice"
                        name="productPrice"
                        label="Product Price"
                        type="number"
                        fullWidth
                        variant="standard"
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
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type="submit">Add</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}