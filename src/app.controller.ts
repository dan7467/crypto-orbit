import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
// import { /*IsString, IsInt, IsBoolean,*/ IsObject } from 'class-validator';
// import { validate } from 'class-validator';

// class exampleValidator {

//   // @IsString()
//   //   someStr: string;

//   // @IsInt()
//   //   someNum: number;

//   // @IsBoolean()
//   //   someBool: boolean;

//   @IsObject()
//     someObj: {
//       someNeededStrField_in_someObj: string
//     }
// }

@Controller()
export class AppController {
  
  constructor(private readonly appService: AppService) {}

  @Get()
  getTest(): string {
    return this.appService.getTest();
  }

  @Post()
  postTest(): string {
    return this.appService.postTest();
  }

  // @Post()
  // testValidatedClass(testParam: exampleValidator): string {

  //   validate(testParam).then((errors) => {

  //       if (errors.length > 0) {
  //           return 'Validation failed: parameter was not formatted as expected!';
  //       }

  //       else if (!('someNeededStrField_in_someObj' in testParam.someObj)) {
  //           return 'Validation failed: parameter was not formatted as expected!';
  //       }

  //   });

  //   return this.appService.testValidatedClass();
    
  // }

}
