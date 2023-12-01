import 'bootstrap-icons/font/bootstrap-icons.css';
import Swal from 'sweetalert2'

export default function ListaUsuario(props) {

  function confirmaExclusao(id, nome) {
    Swal.fire({
      title: `Confirma Exclusão do Usuário "${nome}"?`,
      text: "Esta operação não poderá ser desfeita",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim. Excluir!'
    }).then((result) => {
      if (result.isConfirmed) {
        props.exclui(id)
        Swal.fire(
          'Excluído!',
          'Usuário excluído com sucesso',
          'success'
        )
      }
    })
  }

  return (
    <tr>
      <td>
        <img src={props.usuario.perfil} alt={`Foto de perfil de ${props.usuario.nome}`} width={90} />
      </td>
      <td className={props.usuario.destaque ? "fw-bold" : ""}>{props.usuario.nome}</td>
      <td className={props.usuario.destaque ? "fw-bold" : ""}>{props.usuario.email}</td>
      <td className={props.usuario.destaque ? "fw-bold" : ""}>{props.usuario.sexo}</td>
      <td className={props.usuario.destaque ? "fw-bold" : ""}>{props.usuario.bairro}</td>
      <td>
        <i className="bi bi-x-circle text-danger" style={{ fontSize: 24, cursor: 'pointer' }}
          onClick={() => confirmaExclusao(props.usuario.id, props.usuario.nome)}
          title="Excluir"
        ></i>
        <i className="bi bi-pencil-square text-warning ms-2" style={{ fontSize: 24, cursor: 'pointer' }}
          onClick={props.altera}
          title="Alterar"
        ></i>
        <i className="bi bi-search text-success ms-2" style={{ fontSize: 24, cursor: 'pointer' }}
          onClick={props.consulta}
          title="Consultar"
        ></i>
        <i className="bi bi-house-check text-primary ms-2" style={{ fontSize: 24, cursor: 'pointer' }}
          onClick={props.destaca}
          title="Destacar"
        ></i>
      </td>
    </tr>
  )
}