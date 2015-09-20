require 'httparty'

class ContratosController < AplicationController

    def ParseContrato
        response = HTTParty.get('http://dados.gov.br/dataset/compras-publicas-do-governo-federal')
        response.each do |item|
            u = Contrato.new(
                :identificadorContrato => item["Identificador do Contrato"],
                :uasg => item["Uasg"],
                :modalidadeLicitacao => item["Modalidade da Licitação"],
                :codigoContrato => item["Modalidade da Licitação"],
                :licitacaoAssociada => item["Licitação Associada"],
                :ModalidadeLicitacao => item["Modalidade da Licitação"],
                :objeto => item["Objeto"],
                :numeroAditivos => item["Número de Aditivos"],
                :numeroProcessos => item["Número de Processos"],
                :CPFContratada => item["CPF Contratada"],
                :dataAssinatura => item["Data da Assinatura"],
                :fundamentoGeral => item["Fundamento Geral"],
                :dataInicioVigencia => item["Data de Inicio da Vigência"],
                :dataTerminoVigencia => item["Data de Término da Vigência"],
                :valorInicial => item["Valor Inicial"],
                :valorInicial => item["Valor Inicial"],
                :aditivosContrato => item["Aditivos Contrato"],
                :eventosContrato => item["Eventos do Contrato"]
            )
    end
end
