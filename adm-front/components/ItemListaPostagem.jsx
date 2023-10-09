import 'bootstrap-icons/font/bootstrap-icons.css';
import Swal from 'sweetalert2'

export default function ListaPostagem(props) {

  function confirmaExclusao(id, titulo) {
    // if (confirm(`Confirma Exclusão da postagem "${titulo}"?`)) {
    //   props.exclui(id)
    // }
    Swal.fire({
      title: `Confirma Exclusão da Postagem "${titulo}"?`,
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
          'Postagem excluída com sucesso',
          'success'
        )
      }
    })
  }

  return (
    <tr>
      <td>
        {props.postagem.pet ? (
          <img src={props.postagem.fotopet} alt={`Foto do pet de ${props.postagem.nome}`} width={90} />
        ) : (
          <img
            src="https://img.freepik.com/vetores-premium/padrao-sem-emenda-de-vetor-com-pegadas-de-animais-de-estimacao-fundo-para-papel-de-parede-da-pagina-da-web-pet-shop_562639-204.jpg?w=740"
            alt={`Não possui pet na postagem`}
            width={90}
          />
        )}
      </td>

      <td>{props.postagem.titulo}</td>
      <td>{props.postagem.nome}</td>
      <td>{props.postagem.assunto}</td>
      <td>{props.postagem.pet ? "Com pet" : "Sem pet"}</td>
      <td>
        <i className="bi bi-x-circle text-danger" style={{ fontSize: 24, cursor: 'pointer' }}
          onClick={() => confirmaExclusao(props.postagem.id, props.postagem.titulo)}
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
      </td>
    </tr>
  )
}