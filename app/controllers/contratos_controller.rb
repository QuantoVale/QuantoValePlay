class ContratosController < ApplicationController
  def index
       @contratos = Contrato.all
       render json:@contratos
  end

  def values_aleatory value_true
    return value_true*(1+rand(30))/(1+(rand(30)))
  end

  def merge values_random, value_true
    return array_value = [values_random, value_true.round(0)]
  end

  def validate_values_aleatory value_validate, value_true
    while value_validate == value_true
      value_validate = values_aleatory(value_true)
    end
    return value_validate
  end
  #.flatten junta .shuffle mistura

  def applying_flatten array_value
    return array_value.flatten!
  end

  def applying_shuffle array_question
    return array_question.shuffle
  end

  def generateRanking

      player = Player.all
      player.each do |user|
          puts(user.name)

      end
  end

  def service

    @contrato = Contrato.find(params["id"])
    values_random = Array.new(3)
    value_true = Float(@contrato.valorInicial).round(0)

    for i in 0..2
      values_random[i] = validate_values_aleatory(values_aleatory(value_true).round(0),value_true)
    end

    return array_question = {"ask"=>@contrato.objeto.capitalize,
        "val"=>applying_shuffle(applying_flatten(merge(values_random, value_true))), "trueval"=>value_true}

  end

  def show
      generateRanking()
      render json:service
  end
end
