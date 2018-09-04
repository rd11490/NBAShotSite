package datamodel

final case class PlayerName(id: Int, name: String)

final case class PlayerNameResponse(names: Seq[PlayerName])
