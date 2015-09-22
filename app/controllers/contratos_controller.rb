class ContratosController < ApplicationController

  def index
       @contratos = Contrato.all
       render json: @contratos
  end

  def show
       @contratos = Contrato.all
       render json: @contratos
  end

end
