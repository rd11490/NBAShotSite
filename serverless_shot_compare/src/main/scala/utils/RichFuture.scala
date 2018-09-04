package utils

import scala.concurrent.duration.Duration
import scala.concurrent.duration._
import scala.concurrent.{Await, Future}

object RichFuture {
  implicit class RichFuture[T](future: Future[T]) {
    def await(implicit duration: Duration = 60.seconds): T = Await.result(future, duration)
  }
}
