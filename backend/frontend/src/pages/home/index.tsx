/* eslint-disable jsx-a11y/alt-text */
import {
  Titulo,
  Principal,
  Rodape,
  Container,
  Logo,
  CadastroContainer,
  ContainerModal,
} from "./style";
import LogoDark from "../../Assets/logo512.png";
import LogoLigth from "../../Assets/logoLigth.png";
import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { IoAdd } from "react-icons/io5";
import { AiFillEdit, AiTwotoneDelete } from "react-icons/ai";
import {
  TableRow,
  TableContainer,
  Table,
  TableHead,
  TableCell,
  TableBody,
  styled,
  tableCellClasses,
  Checkbox,
  Button,
  ButtonGroup,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  IconButton,
  Snackbar,
  Modal,
} from "@mui/material";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    fontFamily: "Fira Code",
    backgroundColor: "#1B8998",
    color: "#2E2D2D",
    fontSize: 14,
    fontWeight: "bold",
  },
  [`&.${tableCellClasses.body}`]: {
    fontFamily: "Fira Code",
    fontSize: 14,
    fontWeight: "bold",
    borderBottom: "1px solid #65E3F4",
    color: "#b1b1b1",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const label = { inputProps: { "aria-label": "Complete Task" } };

interface Task {
  id: number;
  name: string;
  completed: boolean;
}

const Home = () => {
  const [task, setTask] = useState<Task[]>([]);
  const [id, setId] = useState(0);
  const [name, setName] = useState("");
  const [completed, setCompleted] = useState(false);
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [openConfirmacao, setOpenConfirmacao] = useState(false);
  const [openSuccesEdit, setOpenSuccesEdit] = useState(false);
  const [openSuccesRegister, setOpenSuccesRegister] = useState(false);
  const [openError, setOpenError] = useState(false);

  const listTasks = () => {
    axios.get(`http://localhost:7000/api/todos`).then((response) => {
      setTask(response.data);
    });
  };

  const RegisterTasks = () => {
    if (name === "" || name === null) {
      setOpenError(true);
    } else {
      axios
        .post(`http://localhost:7000/api/todos`, {
          name,
        })
        .then(() => {
          setOpenSuccesRegister(true);
          listTasks();
        });
    }
  };

  const onDelete = (id: number) => {
    axios.delete(`http://localhost:7000/api/todos/${id}`).then(() => {
      listTasks();
      handleClose();
    });
  };

  const updateTasks = (id: number, name: string, completed: boolean) => {
    if (name === "" || name === null) {
      setOpenError(true);
    } else {
      axios
        .put(`http://localhost:7000/api/todos/${id}`, {
          name,
          completed,
        })
        .then(() => {
          setOpenModalEdit(false);
          listTasks();
          setOpenSuccesEdit(true);
        });
    }
  };

  function abrirModal(id: number) {
    setOpenModalEdit(true);
    axios.get(`http://localhost:7000/api/todos/${id}`).then((response) => {
      setId(response.data.id);
      setName(response.data.name);
      setCompleted(response.data.completed);
    });
  };

  const abrirConfirmacaoDelete = (id: number) => {
    setOpenConfirmacao(true);
    setId(id);
  };

  const handleCloseSucces = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSuccesEdit(false);
    setOpenSuccesRegister(false);

  };

  const handleCloseError = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenError(false);
  };

  const fecharModal = () => setOpenModalEdit(false);

  const handleClose = () => setOpenConfirmacao(false);

  useEffect(() => {
    listTasks();
  }, []);

  return (
    <Container>

      <Titulo>
        <Logo>
          <img src={LogoDark} />
        </Logo>
      </Titulo>

      <Principal>

        <CadastroContainer>
          <TextField
            style={{
              borderBottom: "1px solid #d3d1d1",
            }}
            id="name"
            onChange={(e) => setName(e.target.value)}
            label="Tarefa"
            required
            variant="standard"
            type="text"
          />
          <IconButton color="primary" onClick={RegisterTasks}>
            <IoAdd />
          </IconButton>
        </CadastroContainer>

        <TableContainer sx={{ maxHeight: 340 }} style={{ width: "40%" }}>
          <Table stickyHeader aria-label="table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">Tarefa</StyledTableCell>
                <StyledTableCell align="right">Concluida</StyledTableCell>
                <StyledTableCell align="right">Opções</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {task
                .filter((row) => row.completed !== true)
                .map((row) => (
                  <StyledTableRow key={row.id}>
                    <StyledTableCell align="center">{row.name}</StyledTableCell>
                    <StyledTableCell align="right">
                      <Checkbox
                        value={row.id}
                        onClick={(e) =>
                          updateTasks(row.id, row.name, row.completed)
                        }
                        onChange={(e) => setCompleted(e.target.checked)}
                        {...label}
                      />
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      <ButtonGroup
                        variant="text"
                        aria-label="text button group"
                      >
                        <IconButton
                          color="primary"
                          onClick={() => abrirModal(row.id)}
                        >
                          <AiFillEdit />
                        </IconButton>
                        <IconButton
                          color="primary"
                          onClick={(e) => abrirConfirmacaoDelete(row.id)}
                        >
                          <AiTwotoneDelete />
                        </IconButton>
                      </ButtonGroup>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>

      </Principal>

      <Rodape>Copycenter © 2021 Lara Vitória</Rodape>

      <Modal
        style={{
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
          flexDirection: "column",
          alignItems: "center",
        }}
        open={openModalEdit}
        onClose={fecharModal}
        aria-labelledby="Editar Tarefa"
        aria-describedby="Edição da tarefa"
      >
        <ContainerModal>
          <Logo>
            <img src={LogoLigth} />
          </Logo>
          <TextField
            onChange={(e) => setName(e.target.value)}
            value={name}
            label="Tarefa"
            required
            variant="standard"
            type="text"
          />
          <Button
            variant="outlined"
            type="submit"
            color="secondary"
            onClick={() => updateTasks(id, name, completed)}
          >
            Editar
          </Button>
        </ContainerModal>
      </Modal>

      <Dialog open={openConfirmacao} onClose={handleClose}>
        <DialogTitle style={{ textAlign: "center", fontFamily: "Fira Code" }}>
          Exclusão de Tarefa
        </DialogTitle>
        <DialogContent style={{ display: "flex", alignItems: "center" }}>
          <DialogContentText
            style={{
              fontWeight: "bold",
              color: "#1B8998",
              fontFamily: "Fira Code",
            }}
          >
            Deseja realmente excluir esta tarefa?
          </DialogContentText>
        </DialogContent>
        <DialogActions
          style={{
            display: "flex",
            justifyContent: "center",
            fontFamily: "Fira Code",
          }}
        >
          <Button
            style={{ fontFamily: "Fira Code" }}
            variant="outlined"
            color="secondary"
            onClick={handleClose}
          >
            Não
          </Button>
          <Button
            style={{ fontFamily: "Fira Code" }}
            variant="contained"
            color="primary"
            onClick={() => onDelete(id)}
          >
            Sim
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={openSuccesEdit}
        autoHideDuration={1500}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        onClose={handleCloseSucces}
      >
        <Alert onClose={handleCloseSucces} severity="success">
          Tarefa alterada com sucesso!
        </Alert>
      </Snackbar>

      <Snackbar
        open={openSuccesRegister}
        autoHideDuration={1500}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        onClose={handleCloseSucces}
      >
        <Alert onClose={handleCloseSucces} severity="success">
          Tarefa cadastrada com sucesso!
        </Alert>
      </Snackbar>

      <Snackbar
        open={openError}
        autoHideDuration={1500}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        onClose={handleCloseError}
      >
        <Alert
          onClose={handleCloseError}
          severity="error"
          sx={{ width: "100%" }}
        >
          Por favor, preencha o campo!
        </Alert>
      </Snackbar>
      
    </Container>
  );
};

export default Home;
