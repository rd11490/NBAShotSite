package endpoints

import datamodel._
import org.json4s.{DefaultFormats, Extraction}
import storage.PostgresClient
import storage.tables.NBATables

import scala.concurrent.ExecutionContext

object ParamsHandler {

  implicit val executionContext: ExecutionContext = ExecutionContext.global
  implicit val defaultFormats = DefaultFormats

  import utils.RichFuture._

  def handleRawParams(request: RawShotRequest): RawShotRequest = {
    storeRawParams(request)
    val params = extractRawParams(request)
    val id = params.hashCode().toString
    RawShotRequest(Some(id), Some(params))
  }

  private[endpoints] def toCachedParams[T](params: T): Seq[CacheParams] = {
    println("To Cached Params")
    val id = params.hashCode().toString
    Seq(CacheParams(id, Extraction.decompose(params)))
  }

  private def extractRawParams(request: RawShotRequest): ShotRequest = {
    request.hash.flatMap(getRawParamsFromCache)
      .getOrElse(request.params
        .getOrElse(ShotRequest()))
  }

  private def storeRawParams(request: RawShotRequest): Unit = {
    request.params.foreach(params => {
     val cachedParams = toCachedParams(params)
      PostgresClient.insertInto[CacheParams](NBATables.raw_cache_table, cachedParams)
    })
  }

  private def getRawParamsFromCache(hash: String): Option[ShotRequest] = {
    PostgresClient.selectFrom(
      NBATables.raw_cache_table,
      CacheParams.apply,
      s"primarykey = '$hash'")
      .map(_.headOption.flatMap(_.params.extractOpt[ShotRequest])).await()
  }

  def handleFrequencyParams(request: FrequencyShotRequest): FrequencyShotRequest = {
    println("Handling params")
    storeFrequencyParams(request)
    val params = extractFrequencyParams(request)
    val id = params.hashCode().toString
    FrequencyShotRequest(Some(id), Some(params))
  }

  private def extractFrequencyParams(request: FrequencyShotRequest): ShotRequest = {
    request.hash.flatMap(getFrequencyParamsFromCache)
      .getOrElse(request.params
        .getOrElse(ShotRequest()))
  }

  private def storeFrequencyParams(request: FrequencyShotRequest): Unit = {
    println("Storing params")
    request.params.foreach(params => {
      try {
        val cachedParams = toCachedParams(params)
        PostgresClient.insertInto[CacheParams](NBATables.frequency_cache_table, cachedParams)
      } catch {
        case e: Throwable =>
          println(e.getMessage)
          println(e)
          throw e
      }
    })
  }

  private def getFrequencyParamsFromCache(hash: String): Option[ShotRequest] = {
    PostgresClient.selectFrom(
      NBATables.frequency_cache_table,
      CacheParams.apply,
      s"primarykey = '$hash'")
      .map(_.headOption.flatMap(_.params.extractOpt[ShotRequest])).await()
  }


  def handleCompareParams(request: CompareShotRequest): CompareShotRequest = {
    storeCompareyParams(request)
    val params = extractCompareParams(request)
    val id = params.hashCode().toString
    CompareShotRequest(Some(id), Some(params))
  }

  private def extractCompareParams(request: CompareShotRequest): ShotCompareRequest = {
    request.hash.flatMap(getCompareParamsFromCache)
      .getOrElse(request.params.getOrElse(ShotCompareRequest(ShotRequest(), ShotRequest())))
  }

  private def storeCompareyParams(request: CompareShotRequest): Unit = {
    request.params.foreach(params => {
      val cachedParams = toCachedParams(params)
      PostgresClient.insertInto[CacheParams](NBATables.compare_cache_table, cachedParams)
    })
  }


  private def getCompareParamsFromCache(hash: String): Option[ShotCompareRequest] = {
    PostgresClient.selectFrom(
      NBATables.compare_cache_table,
      CacheParams.apply,
      s"primarykey = '$hash'")
      .map(_.headOption.flatMap(_.params.extractOpt[ShotCompareRequest])).await()
  }
}
