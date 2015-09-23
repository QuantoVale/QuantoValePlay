require 'httparty'
class Contrato < ActiveRecord::Base
  def parseContrato
      response = HTTParty.get('http://compras.dados.gov.br/contratos/v1/contratos.json')
      response.each do |item|
            u = Contrato.new(
            :identificadorContrato => item('Identificador do Contrato'))
            u.save
      end
      '''@apis = Api.all'''
  end
end
