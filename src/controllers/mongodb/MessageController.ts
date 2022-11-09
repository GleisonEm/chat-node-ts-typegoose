import { Request, Response } from "express";
import { CreateMessageService } from "../../services/mongodb/CreateMessageService";
import { ReadMessageService } from "../../services/mongodb/ReadMessageService";

export class MessageController {
  async create(request: Request, response: Response) {
    const {
      userSendId,
      conversationId,
      uniqueId,
      message,
    }: {
      userSendId: string;
      message: string;
      uniqueId: string;
      conversationId: string;
    } = request.body;
    const service = new CreateMessageService();
    const result = await service.execute({
      userSendId,
      conversationId,
      uniqueId,
      message,
    });

    if (result instanceof Error) {
      return response.status(400).json(result.message);
    }

    return response.json(result);
  }
  async find(request: Request, response: Response) {
    const {
      conversationId,
      status,
      converseIds,
    }: {
      conversationId: string;
      status?: string;
      converseIds?: Array<String>;
    } = request.body;

    const service = new ReadMessageService();
    const result = await service.get({ conversationId, status, converseIds });

    if (result instanceof Error) {
      return response.status(400).json(result.message);
    }

    return response.json({
      messages: result,
    });
  }
  async test(request: Request, response: Response) {
    return response.json({
      "uid": "0afa5b6c-135f-4e9a-9d00-5ff64c97d30a",
      "id": "301",
      "status": "created",
      "deliveryFee": 5,
      "paymentMethod": "money",
      "notes": "sem cebola",
      "courierFee": 4,
      "orderTotal": 84,
      "orderDetails": "1x pizza de calabresa",
      "despatchMode": "manual",
      "deliveryPoint": {
        "address": "R. Bulhões Marquês, 11 - Boa Vista, Recife",
        "street": "R. Bulhões Marquês",
        "houseNumber": "11",
        "coordinates": {
          "lat": -8.063775239879797,
          "lng": -34.884067621365865
        },
        "city": "Recife",
        "region": "PE",
        "country": "BR",
        "complement": "Bar do biu"
      },
      "collectionPoint": {
        "name": "C&A modas",
        "address": "Av. Conde da Boa Vista - Boa Vista, Recife",
        "coordinates": {
          "lat": -8.059776099059915,
          "lng": -34.88521910379321
        },
        "city": "Recife",
        "region": "PE",
        "country": "BR"
      },
      "customer": {
        "customerPhone": "+5511987521144",
        "customerName": "José da Silva",
        "customerEmail": "nome@empresa.com"
      },
      "courier": {
        "courierPhone": "+5511999999993",
        "courierName": "Maria Helena",
        "courierType": "internal"
      },
      "date": "2020-06-18T14:13:27-03:00",
      "readyDate": "2020-06-18T14:13:32-03:00",
      "despatchDate": "2020-06-18T14:13:35-03:00",
      "collectedDate": "2020-06-18T14:13:47-03:00",
      "deliveryDate": "2020-06-18T14:13:52-03:00",
      "creationDate": "2020-06-18T14:13:27-03:00",
      "updateDate": "2020-06-18T14:13:53-03:00"
    });
  }
}
