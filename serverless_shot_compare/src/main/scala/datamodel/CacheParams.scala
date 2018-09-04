package datamodel

import com.github.mauricio.async.db.RowData
import org.json4s.DefaultFormats
import org.json4s.JsonAST.JValue
import org.json4s.jackson.JsonMethods._


final case class CacheParams(primaryKey: String, params: JValue)

object CacheParams extends ResultSetMapper {

  implicit val defaultFormats = DefaultFormats

  def apply(resultSet: RowData): CacheParams =
    CacheParams(
      getString(resultSet, 0),
      parse(getString(resultSet, 1)))

}