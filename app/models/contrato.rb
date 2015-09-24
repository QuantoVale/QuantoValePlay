require 'httparty'


class Contrato < ActiveRecord::Base


  def parseContrato

    #Usando a gem HTTParty para realizar a leitura do JSON da API
    response = HTTParty.get('http://compras.dados.gov.br/contratos/v1/contratos.json')
      data_hash = response['_embedded']
      data = data_hash['contratos']


      #Estrutura de repetição usada para passar por todo JSON da API
      response.each do |item|
        #Estrututa de leitura do API
        # :atributoModel => item('atributoAPI')
        #Criando uma nova instancia do contrato e atribuindo valores
        #que serão retirados da API
            u = Contrato.new(
            :identificadorContrato => item('Identificador'),
            :uasg => item('uasg'),
            :modalidadeLicitacao => item('modalidade_licitacao'),
            :codigoContrato => item('codigo_contrato'),
            :licitacaoAssociada => item('licitacao_associada'),
            :objeto => item('objeto'),
            :numeroAditivos => item('numero_aditivo'),
            :numeroProcessos => item('numero_processo'),
            :CPFContratada => item('cnpj_contratada'),
            :dataAssinatura => item('data_assinatura'),
            :fundamentoGeral => item('fundamento_geral'),
            :dataInicioVigencia => item('data_inicio_vigencia'),
            :dataTerminoVigencia => item('data_termino_vigencia'),
            :valorInicial => item('valor_inicial')
          )
          #
            u.save
      end
  end



end
